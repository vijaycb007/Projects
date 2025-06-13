import cv2
import numpy as np
import tensorflow as tf
import mediapipe as mp
import pyttsx3
import threading

# ✅ Initialize Text-to-Speech Engine
engine = pyttsx3.init()
engine.setProperty("rate", 150)  # Adjust speed

# ✅ Function to speak sign in a separate thread
def speak_text(text):
    engine.say(text)
    engine.runAndWait()

# ✅ Load Model and Custom Objects
custom_objects = {"AdamW": tf.keras.optimizers.Adam}
model = tf.keras.models.load_model("1_hand_scripts_and_data/clean_single_hand_model.h5", custom_objects=custom_objects)

# ✅ Load label encoder
label_encoder = np.load("1_hand_scripts_and_data/label_encoder.npy", allow_pickle=True).item()

# ✅ Load scaler mean and scale values
scaler_mean = np.load("1_hand_scripts_and_data/scaler.npy")
scaler_scale = np.load("1_hand_scripts_and_data/scaler_scale.npy")

# ✅ Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.6, min_tracking_confidence=0.6)

# ✅ Buffer for storing past frames (🔄 Changed back to 30 to match model input size)
sequence_buffer = []
SEQUENCE_LENGTH = 30  
CONFIDENCE_THRESHOLD = 0.7  

previous_prediction = ""  

# ✅ Function to extract hand landmarks
def extract_landmarks(results):
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            return np.array([[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]).flatten()
    return np.zeros(63)  

# ✅ Function to make a real-time prediction
def get_prediction(sequence):
    sequence = np.array(sequence)

    if len(sequence) < SEQUENCE_LENGTH:
        return "Unknown", 0.0  # Not enough frames to make a prediction

    # Normalize sequence: Use the same scaler mean and scale values you used during training
    sequence = (sequence - scaler_mean) / scaler_scale

    # ✅ Fix input shape: (30, 63) → (1, 30, 63) to match model expectations
    sequence = np.expand_dims(sequence, axis=0)

    # Model prediction
    probs = model.predict(sequence, verbose=0)[0]

    # Decode label and confidence
    pred_label = label_encoder[np.argmax(probs)]
    confidence = np.max(probs)

    return pred_label, confidence

# ✅ Start video capture
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 950)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)
print("🎥 Webcam started... Press 'q' to quit.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    # Flip the image for a mirror effect
    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process frame with MediaPipe Hands
    results = hands.process(rgb_frame)

    # Extract landmarks
    landmarks = extract_landmarks(results)

    # Append to sequence buffer
    sequence_buffer.append(landmarks)

    # Keep buffer size fixed
    if len(sequence_buffer) > SEQUENCE_LENGTH:
        sequence_buffer.pop(0)

    # Predict continuously
    pred_label, confidence = "Unknown", 0.0
    if len(sequence_buffer) == SEQUENCE_LENGTH:
        pred_label, confidence = get_prediction(sequence_buffer)

    # ✅ Only display and speak the prediction if confidence is above threshold
    if confidence >= CONFIDENCE_THRESHOLD:
        text = f"Sign: {pred_label} ({confidence:.2f})"
        cv2.putText(frame, text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

        # ✅ Speak only if the sign changes
        if pred_label != previous_prediction:
            previous_prediction = pred_label  
            threading.Thread(target=speak_text, args=(pred_label,), daemon=True).start()

    # ✅ Draw hand landmarks if detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    # Show Webcam Feed
    cv2.imshow("Sign Language Recognition", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
