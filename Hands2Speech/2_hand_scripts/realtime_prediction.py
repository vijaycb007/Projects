import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import mediapipe as mp
import pyttsx3
import threading  # To run voice output separately

# Initialize Text-to-Speech Engine
engine = pyttsx3.init()
engine.setProperty("rate", 150)

# Function to speak sign in a separate thread
def speak_text(text):
    engine.say(text)
    engine.runAndWait()

# Define Transformer Layer for Model Loading
class TransformerEncoderLayer(tf.keras.layers.Layer):
    def __init__(self, embed_dim, num_heads, ffn_units, dropout_rate=0.1, **kwargs):
        super(TransformerEncoderLayer, self).__init__(**kwargs)
        self.multi_head_attention = tf.keras.layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = tf.keras.Sequential([
            tf.keras.layers.Dense(ffn_units, activation="relu"),
            tf.keras.layers.Dense(embed_dim)
        ])
        self.layernorm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = tf.keras.layers.Dropout(dropout_rate)
        self.dropout2 = tf.keras.layers.Dropout(dropout_rate)

    def call(self, inputs, training):
        attn_output = self.multi_head_attention(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)

# Register Transformer Layer
custom_objects = {"TransformerEncoderLayer": TransformerEncoderLayer}

# Load Model
model = load_model("2_hand_scripts_and_data/final_model.h5", custom_objects=custom_objects)

# Class Labels
CLASS_LABELS = ["Afraid", "Come or Go", "Danger", "Emergency", "Excited", "Family",
                "Happy", "Help", "How", "More", "Pain", "Read", "Run", "Stand",
                "Stop", "What", "When"]

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.6, min_tracking_confidence=0.6, max_num_hands=2)  # Slightly reduced accuracy for speed
mp_drawing = mp.solutions.drawing_utils

# Webcam
cap = cv2.VideoCapture(0)
#webcam size
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 950)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)

previous_prediction = ""  # To prevent repeated voice outputs

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)  # Mirror effect

    # Convert frame to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_frame)

    # Extract hand landmarks
    landmarks_list = []
    if results.multi_hand_landmarks and len(results.multi_hand_landmarks) == 2:
        for hand_landmarks in results.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                landmarks_list.extend([lm.x, lm.y, lm.z])
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        # Ensure Correct Shape (30, 63)
        if len(landmarks_list) == 126:
            landmarks_list = np.array(landmarks_list).reshape(1, -1)
            input_data = np.zeros((1, 30, 63))
            input_data[:, :30] = np.tile(landmarks_list[:, :63], (30, 1))

            # Prediction
            prediction = model.predict(input_data)
            predicted_label_idx = np.argmax(prediction[0])
            predicted_label = CLASS_LABELS[predicted_label_idx]
            confidence = prediction[0][predicted_label_idx]

            # Display on screen
            cv2.putText(frame, f"Sign: {predicted_label} ({confidence:.2f})", 
                        (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

            # **Speak the detected sign only if it changes**
            if predicted_label != previous_prediction:
                previous_prediction = predicted_label  # Update last spoken sign
                threading.Thread(target=speak_text, args=(predicted_label,), daemon=True).start()

    else:
        cv2.putText(frame, "Sign: ---", (50, 100), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

    # Show Frame
    cv2.imshow("Sign Language Detection", frame)

    # **Exit with 'q' Key**
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
