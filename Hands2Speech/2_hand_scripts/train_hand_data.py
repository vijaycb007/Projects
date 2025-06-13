import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, regularizers
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight

# 💾 Load Preprocessed Data
DATA_DIR = "2_hand_scripts_and_data/preprocessed_data"
X_data = np.load(os.path.join(DATA_DIR, "2_hand_scripts_and_data/preprocessed_data/X_data.npy"))
y_labels = np.load(os.path.join(DATA_DIR, "2_hand_scripts_and_data/preprocessed_data/y_labels.npy"))

# 🏷️ Create Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_data, y_labels, test_size=0.1, random_state=42, stratify=y_labels
)

# 💾 Save Test Data
np.save(os.path.join(DATA_DIR, "X_test.npy"), X_test)
np.save(os.path.join(DATA_DIR, "y_test.npy"), y_test)
print("✅ Test set saved!")

# 🚀 Hyperparameters (Optimized)
SEQ_LEN = 30  # Frames per sign
FEATURES = 63  # Hand landmarks
NUM_CLASSES = len(np.unique(y_labels))
D_MODEL = 128  # Transformer hidden size
HEADS = 4  # Multi-head attention heads
FFN_UNITS = 256  # Feedforward units
DROPOUT_RATE = 0.5  # 🔥 Increased to prevent overfitting
L2_REG = 2e-4  # 🔥 Stronger L2 Regularization
INITIAL_LR = 0.001  # Adjusted initial learning rate
BATCH_SIZE = min(128, max(32, len(y_train) // 100))
EPOCHS = 100  # Early stopping will prevent unnecessary training

# ⚖ Compute Class Weights (Fixes Dataset Imbalance)
class_weights = compute_class_weight("balanced", classes=np.unique(y_labels), y=y_labels)
class_weight_dict = {i: class_weights[i] for i in range(NUM_CLASSES)}

# 🔥 Advanced Data Augmentation (Prevents Overfitting)
def augment_data(X):
    noise = np.random.normal(0, 0.02, X.shape)  # Gaussian noise
    flip = np.random.choice([1, -1], size=(X.shape[0], 1, 1))  # Random mirroring
    scale = np.random.uniform(0.9, 1.1, size=(X.shape[0], 1, 1))  # Random scaling
    shuffle_frames = np.random.permutation(SEQ_LEN)  # Frame order shuffling
    X_aug = X * scale * flip + noise
    return X_aug[:, shuffle_frames, :]  # Apply frame shuffle

X_train = augment_data(X_train)

# 🔥 Transformer Encoder Layer (Optimized)
class TransformerEncoderLayer(layers.Layer):
    def __init__(self, embed_dim, num_heads, ffn_units, dropout_rate=0.2, **kwargs):
        super().__init__(**kwargs)
        self.mha = layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = keras.Sequential([
            layers.Dense(ffn_units, activation="relu", kernel_regularizer=regularizers.l2(L2_REG)),
            layers.Dense(embed_dim, kernel_regularizer=regularizers.l2(L2_REG)),
        ])
        self.norm1 = layers.LayerNormalization(epsilon=1e-6)
        self.norm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(dropout_rate)
        self.dropout2 = layers.Dropout(dropout_rate)

    def call(self, inputs, training=False):
        attn_output = self.mha(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.norm1(inputs + attn_output)

        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.norm2(out1 + ffn_output)

# 📌 Model Definition (🔥 Optimized for Stability & Accuracy)
inputs = keras.Input(shape=(SEQ_LEN, FEATURES))
x = layers.Conv1D(filters=128, kernel_size=3, padding="same", activation="relu")(inputs)
x = layers.BatchNormalization()(x)
x = layers.Dropout(DROPOUT_RATE)(x)

x = TransformerEncoderLayer(D_MODEL, HEADS, FFN_UNITS, DROPOUT_RATE)(x)
x = layers.BatchNormalization()(x)  # 🔥 Added BatchNorm

x = layers.Bidirectional(
    layers.LSTM(256, return_sequences=False, dropout=0.3, recurrent_dropout=0.3, 
                recurrent_regularizer=regularizers.l2(L2_REG))
)(x)
x = layers.BatchNormalization()(x)  # 🔥 Added BatchNorm

x = layers.Dense(256, activation="relu", kernel_regularizer=regularizers.l2(L2_REG))(x)
x = layers.Dropout(DROPOUT_RATE)(x)
x = layers.Dense(NUM_CLASSES, activation="softmax")(x)

model = keras.Model(inputs, x)

# 🚀 Cosine Learning Rate Decay Restart
lr_schedule = tf.keras.optimizers.schedules.CosineDecayRestarts(
    initial_learning_rate=INITIAL_LR,
    first_decay_steps=10,
    t_mul=2.0,  # Longer decay time
    m_mul=0.8,  # Reduce learning rate after restart
    alpha=0.0001  # Minimum LR
)
optimizer = keras.optimizers.Adam(learning_rate=lr_schedule, clipnorm=1.0)

model.compile(optimizer=optimizer,
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

# 📌 Model Summary
model.summary()

# 🚀 Callbacks (🔥 Improved Training Stability)
checkpoint_cb = keras.callbacks.ModelCheckpoint(
    "best_model.h5", save_best_only=True, monitor="val_loss", mode="min"
)
early_stopping_cb = keras.callbacks.EarlyStopping(
    patience=6, restore_best_weights=True, monitor="val_loss", mode="min"
)

# 🎯 Train the Model (🔥 Now with Augmented Data & Improved Stability)
history = model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    batch_size=BATCH_SIZE,
    epochs=EPOCHS,
    class_weight=class_weight_dict,  # ✅ Fixes Class Imbalance
    callbacks=[checkpoint_cb, early_stopping_cb]
)

# 📊 Plot Accuracy & Loss Curves
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(history.history["accuracy"], label="Train Accuracy")
plt.plot(history.history["val_accuracy"], label="Val Accuracy")
plt.legend()
plt.title("Accuracy")

plt.subplot(1, 2, 2)
plt.plot(history.history["loss"], label="Train Loss")
plt.plot(history.history["val_loss"], label="Val Loss")
plt.legend()
plt.title("Loss")

plt.show()

# ✅ Save Final Model
model.save("final_model.h5")
print("🎉 Model training complete! Best model saved as 'best_model.h5' and 'final_model.h5'.")
