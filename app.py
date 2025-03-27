from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load trained model
model_path = os.path.join(os.getcwd(), 'water_leak_detection_model.pkl')
model = joblib.load(model_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([[data['pressure'], data['flow_rate'], data['temperature']]])
    prediction = model.predict(features)[0]
    result = "Leak Detected! 🚨" if prediction == 1 else "No Leak ✅"
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
