import os
import numpy as np
import pandas as pd

# 📂 Dataset Paths
DATASET_PATH = "1_hand_dataset"
OUTPUT_CSV_PATH = "processed_single_hand_landmarks.csv"
OUTPUT_NPY_PATH = "processed_single_hand_landmarks.npy"
LABEL_MAP_PATH = "label_map_single_hand.txt"
LOG_FILE = "preprocess_log.txt"

# 🏁 Initialize storage
all_landmarks = []
all_labels = []
label_map = {}
log_messages = []

# 🔍 Start Preprocessing
log_messages.append("🔍 Starting FINAL preprocessing...\n")

class_files = sorted(os.listdir(DATASET_PATH))
for label_idx, filename in enumerate(class_files):
    if not filename.endswith(".csv"):
        continue

    file_path = os.path.join(DATASET_PATH, filename)
    sign_name = os.path.splitext(filename)[0]  # Remove ".csv" extension
    label_map[label_idx] = sign_name

    try:
        df = pd.read_csv(file_path)

        # ✅ Validate and clean dataset
        if "label" in df.columns:
            df = df.drop(columns=["label"])

        if df.shape[1] != 63:
            log_messages.append(f"⚠️ Skipped '{filename}' due to unexpected column count ({df.shape[1]})\n")
            continue

        # 📥 Store landmarks & labels
        for index, row in df.iterrows():
            all_landmarks.append(row.values)
            all_labels.append(label_idx)

        log_messages.append(f"📂 [{label_idx+1}/{len(class_files)}] Processing '{filename}' → Label {label_idx}\n")

    except Exception as e:
        log_messages.append(f"⚠️ Failed to read '{filename}': {e}\n")

# 🚨 Check if dataset is valid
if not all_landmarks:
    raise ValueError("❌ No valid data found! Please check your dataset.")

# 💾 Save Processed Data
X = np.array(all_landmarks)
y = np.array(all_labels)

# 🔗 Combine features & labels
processed_data = np.concatenate((X, y.reshape(-1, 1)), axis=1)

# 📜 Save CSV & NPY
np.savetxt(OUTPUT_CSV_PATH, processed_data, delimiter=",", fmt="%.6f")
np.save(OUTPUT_NPY_PATH, processed_data)

# 🔖 Save Label Map
with open(LABEL_MAP_PATH, "w") as f:
    for k, v in label_map.items():
        f.write(f"{k}:{v}\n")

# 📜 Save Log File (UTF-8 Encoding to prevent errors)
with open(LOG_FILE, "w", encoding="utf-8") as log_f:
    log_f.write("\n".join(log_messages))

# ✅ Final Output
print("\n✅ FINAL Preprocessing Complete! 🚀")
print(f"📂 Processed Files: {len(class_files)}")
print(f"📊 Total Samples Collected: {len(all_landmarks)}")
print(f"📝 Processed CSV saved to: {OUTPUT_CSV_PATH}")
print(f"💾 Processed NPY saved to: {OUTPUT_NPY_PATH}")
print(f"🏷 Label map saved to: {LABEL_MAP_PATH}\n")

# 🔎 Show Sample Preview
df_preview = pd.DataFrame(X[:5])
df_preview["label"] = y[:5]
print("🔎 Preview of first 5 samples:")
print(df_preview.head())