from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "✅ Backend API is running!", 200

@app.route("/api/designers", methods=["GET"])
def get_designers():
    json_path = os.path.join(os.path.dirname(__file__), "data", "designers.json")
    if not os.path.exists(json_path):
        return jsonify({"error": "Data file not found"}), 404
    with open(json_path, "r") as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
