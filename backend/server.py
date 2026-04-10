"""
Server.py
Exposes the generated event files to the React Frontend.
"""
from flask import Flask, jsonify
from flask_cors import CORS
import os
import glob
import json

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVENTS_DIR = os.path.join(BASE_DIR, 'data', 'events')

@app.route('/api/latest_event')
def get_latest_event():
    # Find the most recently created JSON file in the events directory
    search_path = os.path.join(EVENTS_DIR, '*.json')
    files = glob.glob(search_path)
    
    if not files:
        # Return sensible defaults if no events exist yet
        return jsonify({
            "event_type": "none",
            "possession": { "home": 50, "away": 50 },
            "homeTeam": "HOME",
            "awayTeam": "AWAY",
            "score": { "home": 0, "away": 0 },
            "clock": "00:00",
            "activePlayer": {
                "name": "Analyzing Feed...",
                "number": 0,
                "stats": { "touches": 0, "passes": "0/0", "rating": 0.0 }
            }
        })

    latest_file = max(files, key=os.path.getctime)
    
    try:
        with open(latest_file, 'r') as f:
            data = json.load(f)
            return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Runs on port 5001 to bypass Airplay
    app.run(debug=True, port=5001)
