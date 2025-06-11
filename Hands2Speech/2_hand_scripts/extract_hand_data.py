import cv2
import mediapipe as mp
import os
import numpy as np
from tqdm import tqdm

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

# Input & Output Paths
INPUT_FOLDER = "2_hand_data_video/"   # Folder containing sign language videos
OUTPUT_FOLDER = "datasets(2_hand)"  # Where extracted skeleton images will be saved
FRAMES_PER_SIGN = 5000  # Target frames per sign

# Ensure Output Folder Exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def extract_frames(video_path, sign_name):
    """Extracts frames with both hands, overlays the skeleton, and saves them."""
    cap = cv2.VideoCapture(video_path)
    extracted_frames = 0

    sign_folder = os.path.join(OUTPUT_FOLDER, sign_name)
    os.makedirs(sign_folder, exist_ok=True)

    print(f"\nProcessing: {sign_name} ({video_path})")

    with tqdm(total=FRAMES_PER_SIGN, desc=f"Extracting {sign_name}", unit=" frames") as pbar:
        while extracted_frames < FRAMES_PER_SIGN:
            ret, frame = cap.read()
            if not ret:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Loop video
                continue

            # Convert to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Detect Hands
            results = hands.process(rgb_frame)

            # Check if BOTH hands are present
            if results.multi_hand_landmarks and len(results.multi_hand_landmarks) == 2:
                # Draw hand landmarks on frame
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Save the skeleton image
                frame_filename = os.path.join(sign_folder, f"{extracted_frames:05d}.jpg")
                cv2.imwrite(frame_filename, frame)

                extracted_frames += 1
                pbar.update(1)

            # Show frame (optional, to see live preview)
            cv2.imshow("Skeleton Preview", frame)
            if cv2.waitKey(1) & 0xFF == ord("q"):  # Press 'q' to stop
                break

    cap.release()
    cv2.destroyAllWindows()
    print(f"✅ Completed: {sign_name} ({extracted_frames} frames)\n")

def process_all_videos():
    """Processes all videos in the input folder"""
    videos = [f for f in os.listdir(INPUT_FOLDER) if f.endswith(('.mp4', '.avi', '.mov'))]
    
    if not videos:
        print("❌ No videos found in the input folder!")
        return

    for video in videos:
        sign_name = os.path.splitext(video)[0]  # Use filename as sign label
        extract_frames(os.path.join(INPUT_FOLDER, video), sign_name)

if __name__ == "__main__":
    process_all_videos()
