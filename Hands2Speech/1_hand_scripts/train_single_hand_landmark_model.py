import numpy as np
import pandas as pd
import tensorflow as tf
import os
import tensorflow_addons as tfa
import time
import matplotlib.pyplot as plt
from tensorflow.keras.models import Model
from tensorflow.keras.layers import (LSTM, Dense, Dropout, Bidirectional, BatchNormalization, 
                                     LayerNormalization, Input, Conv1D, GlobalAveragePooling1D, 
                                     MultiHeadAttention, SpatialDropout1D)
from tensorflow.keras.optimizers import AdamW
from tensorflow.keras.mixed_precision import set_global_policy
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau, TensorBoard

# ✅ Enable mixed precision if GPU available
policy = "mixed_float16" if tf.config.list_physical_devices('GPU') else "float32"
set_global_policy(policy)

# 📂 **Paths**
DATASET_PATH = "processed_single_hand_landmarks.csv"
MODEL_SAVE_PATH = "final_single_hand_model.h5"
LABEL_ENCODER_SAVE_PATH = "label_encoder.npy"
SCALER_MEAN_PATH = "scaler.npy"
SCALER_SCALE_PATH = "scaler_scale.npy"
LOGS_DIR = "logs_final"
PLOT_PATH = "training_results.png"

# 🔥 **Sequence Length**
SEQUENCE_LENGTH = 30  # Adjust based on dataset consistency

# 📊 **Load and Prepare Data**
print("📊 Loading dataset...")
df = pd.read_csv(DATASET_PATH, header=None)
df.dropna(inplace=True)
df = df[~df.duplicated()]

# 🔍 **Extract Features**
X = df.iloc[:, :-1].values
y = df.iloc[:, -1].values

# 🏷️ **Label Encoding**
print("🔄 Encoding labels...")
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)
np.save(LABEL_ENCODER_SAVE_PATH, label_encoder.classes_)

# ⚡ **Feature Scaling**
print("📏 Scaling features...")
scaler = StandardScaler()
X = scaler.fit_transform(X)
np.save(SCALER_MEAN_PATH, scaler.mean_)
np.save(SCALER_SCALE_PATH, scaler.scale_)

# ✂️ **Reshape for Sequential Model**
if X.shape[0] % SEQUENCE_LENGTH != 0:
    print("⚠️ Warning: Dataset size is not perfectly divisible by SEQUENCE_LENGTH. Trimming excess samples.")
    X = X[:X.shape[0] - (X.shape[0] % SEQUENCE_LENGTH)]
    y = y[:y.shape[0] - (y.shape[0] % SEQUENCE_LENGTH)]

X = X.reshape((-1, SEQUENCE_LENGTH, 63))
y = y.reshape((-1, SEQUENCE_LENGTH))[:, 0]  # Ensure correct shape

# 🚀 **Train-validation split**
from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 🚀 **THE FINAL MODEL**
def create_final_model():
    inputs = Input(shape=(SEQUENCE_LENGTH, X_train.shape[2]))

    x = Bidirectional(LSTM(512, return_sequences=True, activation='tanh'))(inputs)
    x = LayerNormalization()(x)

    # 🚀 **Quantum Attention Layer**
    attn = MultiHeadAttention(num_heads=16, key_dim=64)(x, x)
    x = tf.keras.layers.Add()([x, attn])  # Residual connection

    x = Conv1D(filters=256, kernel_size=3, padding="same", activation="relu")(x)
    x = SpatialDropout1D(0.3)(x)
    
    x = Conv1D(filters=128, kernel_size=3, padding="same", activation="relu")(x)
    x = GlobalAveragePooling1D()(x)

    x = Dense(256, activation='relu')(x)
    x = Dropout(0.4)(x)

    outputs = Dense(len(label_encoder.classes_), activation='softmax', dtype='float32')(x)

    model = Model(inputs, outputs)
    return model

model = create_final_model()

# 🚀 **Compile with Optimizer**
model.compile(optimizer=AdamW(learning_rate=0.0005, weight_decay=1e-5),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])

# 🚀 **Callbacks**
callbacks = [
    EarlyStopping(monitor='val_loss', patience=7, restore_best_weights=True, verbose=1),
    ModelCheckpoint(MODEL_SAVE_PATH, monitor='val_accuracy', save_best_only=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.6, patience=3, min_lr=1e-7, verbose=1),
    TensorBoard(log_dir=LOGS_DIR)
]

# 🚀 **TRAIN THE MODEL**
print("\n🔥 **TRAINING FINAL MODEL**")
start_time = time.time()

history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=150, batch_size=64,
    callbacks=callbacks,
    verbose=1
)

end_time = time.time()
print(f"\n⏱️ **Training completed in {end_time - start_time:.2f} seconds**")

# ✅ **Save Model**
print("\n✅ **MODEL TRAINED!** Model saved as:", MODEL_SAVE_PATH)

# 📈 **Plot Accuracy & Loss**
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy', color='blue')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy', color='red')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Model Accuracy')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss', color='blue')
plt.plot(history.history['val_loss'], label='Validation Loss', color='red')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.title('Model Loss')

plt.savefig(PLOT_PATH)
plt.show()