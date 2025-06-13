import os
import numpy as np
import cv2
import mediapipe as mp
from tqdm import tqdm

# Initialize MediaPipe Hands with lower confidence threshold
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.3)  # Lowered to 0.3

# Dataset path
DATASET_DIR = "datasets(2_hand)"
SAVE_DIR = "2_hand_scripts_and_data/preprocessed_data"

# Create save directory if not exists
os.makedirs(SAVE_DIR, exist_ok=True)

# Get class names
class_names = sorted(os.listdir(DATASET_DIR))
print(f"📂 Detected Classes: {class_names}\n🔄 Starting Preprocessing...\n")

X_data, y_labels = [], []
label_dict = {class_name: idx for idx, class_name in enumerate(class_names)}

# Process each class
for class_name in tqdm(class_names, desc="Processing Classes", unit="class"):
    class_path = os.path.join(DATASET_DIR, class_name)
    
    if not os.path.isdir(class_path):
        continue
    
    for video_file in tqdm(os.listdir(class_path), desc=f"🔄 {class_name}", leave=False):
        video_path = os.path.join(class_path, video_file)
        cap = cv2.VideoCapture(video_path)
        
        frames = []
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Convert frame to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            # Extract landmarks only if **both** hands are detected
            if results.multi_hand_landmarks and len(results.multi_hand_landmarks) == 2:
                landmarks = []
                for hand_landmarks in results.multi_hand_landmarks:
                    for lm in hand_landmarks.landmark:
                        landmarks.extend([lm.x, lm.y, lm.z])

                if len(landmarks) == 63 * 2:  # Ensure correct shape for both hands
                    frames.append(landmarks[:63])  # Take only one hand's data

        cap.release()

        # Ensure at least 30 frames per video (looping if necessary)
        if len(frames) < 30:
            if frames:  # Only loop if there are some frames
                frames.extend(frames * (30 // len(frames)))  # Repeat existing frames
                frames = frames[:30]  # Trim to 30 frames
            else:
                print(f"⚠ Warning: No valid hand landmarks detected in {video_file}")
                continue  # Skip this video

        if len(frames) == 30:
            X_data.append(frames)
            y_labels.append(label_dict[class_name])

# Convert to NumPy arrays
if X_data:
    X_data = np.array(X_data).reshape(-1, 30, 63)  # Ensure correct shape (num_samples, 30, 63)
    y_labels = np.array(y_labels)

    # Save preprocessed data
    np.save(os.path.join(SAVE_DIR, "X_data.npy"), X_data)
    np.save(os.path.join(SAVE_DIR, "y_labels.npy"), y_labels)
    np.save(os.path.join(SAVE_DIR, "labels_dict.npy"), label_dict)

    # Final verification
    print("\n✅ Preprocessing complete!")
    print(f"📂 Data saved in {SAVE_DIR}")
    print(f"🔢 X_data shape: {X_data.shape}")
    print(f"🔢 y_labels shape: {y_labels.shape}")
    print(f"📊 Labels Dictionary: {label_dict}")
else:
    print("❌ ERROR: No valid data was processed. Please check your dataset!")

