import cv2
import mediapipe as mp
import pandas as pd
import os
import time

# 🔧 Settings
TARGET_SAMPLES = 400
SIGN_NAME = "Sorry"  # ← Change this for each sign you collect
SAVE_DIR = "1_hand_dataset"
FRAME_SKIP_LIMIT = 5  # Skip frames if hand is not cleanly visible

# 📁 Create save directory
os.makedirs(SAVE_DIR, exist_ok=True)
csv_path = os.path.join(SAVE_DIR, f"{SIGN_NAME}.csv")

# 🖐️ MediaPipe Setup
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.75, min_tracking_confidence=0.75)

# 📷 Open Camera
cap = cv2.VideoCapture(0)
print("\n📸 Starting GOD MODE ULTRA PRO MAX v3.0 data collection...")
print(f"🕓 Collecting 400 clean samples for sign: {SIGN_NAME}\n")

data = []
sample_count = 0
skip_count = 0
start_time = time.time()

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("🚨 Camera failed to read.")
        break

    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)

    is_clean = False

    if result.multi_hand_landmarks:
        landmarks = result.multi_hand_landmarks[0]
        # 💀 Draw skeleton
        mp_drawing.draw_landmarks(frame, landmarks, mp_hands.HAND_CONNECTIONS)

        # ✍️ Extract landmark data
        row = []
        for lm in landmarks.landmark:
            row.extend([lm.x, lm.y, lm.z])

        # ✅ Save only clean data
        if len(row) == 63:
            data.append(row)
            sample_count += 1
            is_clean = True
            cv2.putText(frame, f"Samples: {sample_count}/{TARGET_SAMPLES}", (10, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
        else:
            skip_count += 1
    else:
        skip_count += 1

    # ❌ Skip if too many bad frames
    if not is_clean and skip_count > FRAME_SKIP_LIMIT:
        cv2.putText(frame, "⚠️ No clean hand detected", (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    # 💻 Show video feed
    cv2.imshow("📷 GOD MODE ULTRA PRO MAX v3.0", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("\n❌ Interrupted manually.")
        break

    if sample_count >= TARGET_SAMPLES:
        break

end_time = time.time()
cap.release()
cv2.destroyAllWindows()

# 💾 Save collected data
df = pd.DataFrame(data)
df.to_csv(csv_path, index=False)

print(f"\n✅ GOD MODE ULTRA PRO MAX v3.0 Collection Complete!")
print(f"📂 Saved {sample_count} clean samples to: {csv_path}")
print(f"⚡ Time taken: {round(end_time - start_time, 2)} seconds\n")