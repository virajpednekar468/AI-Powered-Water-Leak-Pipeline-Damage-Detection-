import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("water_leak_dataset.csv")  # Ensure the file is in the same directory

# Select relevant features and target
X = df[['Pressure (bar)', 'Flow Rate (L/s)', 'Temperature (°C)']]
y = df['Leak Status']  # Target variable

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'leak_detection_model.pkl')

print("Model trained and saved successfully!")
