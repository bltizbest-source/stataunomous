"""
Observer Agent
Uses google-genai to pass frames to Gemini Pro for OCR.
"""
import os
import cv2
import json

try:
    from google import genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

class ObserverAgent:
    def __init__(self):
        # We manually load .env in case python-dotenv isn't installed
        try:
            with open(os.path.join(os.path.dirname(__file__), ".env"), "r") as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        os.environ["GEMINI_API_KEY"] = line.split("=", 1)[1].strip()
        except FileNotFoundError:
            pass

        if HAS_GENAI and "GEMINI_API_KEY" in os.environ:
            self.client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
            print("👁️  Gemini Vision AI: ONLINE")
        else:
            self.client = None
            print("⚠️ Warning: Gemini API Key not found. Observer will mock responses.")

    def analyze_frame(self, frame_matrix):
        """
        Compresses OpenCV frame to jpeg and requests Gemini context.
        """
        if self.client:
            print("🚀 Sending stream frame to Gemini API...")
            # Encode frame
            _, buffer = cv2.imencode('.jpg', frame_matrix)
            image_bytes = buffer.tobytes()
            
            prompt = '''
            Analyze this football match frame. Read the on-screen scoreboard or broadcast graphics. Provide a JSON response exactly adhering to this schema:
            {
               "clock": "string timestamp (e.g. 45:00)",
               "home_team": "string (read the left/home team abbreviation, e.g. CHE)",
               "away_team": "string (read the right/away team abbreviation, e.g. ARS)",
               "score_home": int (score of home team),
               "score_away": int (score of away team),
               "high_activity": boolean (true if a goal, foul, shot, or intense play is occurring in the frame),
               "active_player_name": "string (try to read name on jersey or UI or 'In Focus')",
               "active_player_number": int (try to read number on jersey or 0 if unknown)
            }
            '''
            try:
                response = self.client.models.generate_content(
                    model='gemini-1.5-flash',
                    contents=[
                        prompt, 
                        genai.types.Part.from_bytes(data=image_bytes, mime_type='image/jpeg')
                    ],
                    config=genai.types.GenerateContentConfig(
                        response_mime_type="application/json"
                    )
                )
                
                # Output successfully parsed JSON structure
                return json.loads(response.text)
                
            except Exception as e:
                print(f"❌ Gemini Error: {e}")

        # Fallback if Gemini fails — do NOT trigger high_activity so no stale data is written
        return {
            "clock": "00:00",
            "home_team": "HOME",
            "away_team": "AWAY",
            "score_home": 0,
            "score_away": 0,
            "high_activity": False,
            "active_player_name": "Analyzing Feed...",
            "active_player_number": 0
        }
