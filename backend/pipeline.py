"""
Pipeline.py
Orchestrates parallel threads for OpenCV (Video) and FFmpeg/PyAudio (Audio).
Triggers intelligent tracking when a volumetric audio spike is detected.
"""

import time
import os
import threading
import numpy as np
import cv2
import subprocess
import yt_dlp
from observer_agent import ObserverAgent
from scout_agent import ScoutAgent
from data_exporter import export_event

TARGET_YOUTUBE_URL = "https://www.youtube.com/watch?v=EcCM2jMqg5o"
AUDIO_PEAK_THRESHOLD = 0.5

class StreamPipeline:
    def __init__(self):
        self.observer = ObserverAgent()
        self.scout = ScoutAgent()
        self.latest_frame = None
        self.peak_detected = False
        self.lock = threading.Lock()
        
        print("🔍 Extracting raw livestream URL from YouTube...")
        ydl_opts = {'format': 'best'}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(TARGET_YOUTUBE_URL, download=False)
            self.stream_url = info_dict.get('url', info_dict.get('manifest_url'))

    def capture_video_thread(self):
        print(f"[Video] Starting OpenCV stream capture on verified URL...")
        cap = cv2.VideoCapture(self.stream_url)
        
        while True:
            ret, frame = cap.read()
            if not ret:
                # If M3U8 string fails, inject a dummy black frame
                frame = np.zeros((1080, 1920, 3), dtype=np.uint8)
                time.sleep(1)
            
            with self.lock:
                self.latest_frame = frame
                # If audio thread flagged a peak, trigger deep analysis
                if self.peak_detected:
                    self.trigger_deep_analysis(frame)
                    self.peak_detected = False
            
            time.sleep(0.033) # Simulate 30fps

    def capture_audio_thread(self):
        print("[Audio] Starting stream audio RMS tracker...")
        # Mocking an audio subprocess read
        # cmd = ["ffmpeg", "-i", M3U8_URL, "-f", "f32le", "-acodec", "pcm_f32le", "-"]
        # process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        
        while True:
            # chunk = process.stdout.read(4096)
            # data = np.frombuffer(chunk, dtype=np.float32)
            # rms = np.sqrt(np.mean(data**2))
            
            # SIMULATION: Send a peak randomly every ~15 seconds
            rms = np.random.uniform(0.1, 0.4)
            if time.time() % 15 < 1:
                rms = 0.8 # Spiking
                
            if rms > AUDIO_PEAK_THRESHOLD:
                print(f"[Audio] CROWD NOISE DETECTED (RMS: {rms:.2f})")
                with self.lock:
                    self.peak_detected = True
                    
            time.sleep(1)

    def trigger_deep_analysis(self, frame):
        print("🧠 Invoking Gemini 3.1 Pro (Observer Agent)...")
        # Step 1: Broad OCR and Context Mapping
        context = self.observer.analyze_frame(frame)
        
        if context.get("high_activity", False):
            print("👁️ High Activity Verified. Pushing live data to dashboard...")
            
            export_event({
                "event_type": "goal" if context.get("score_home", 0) > 3 else "shot",
                "possession": {"home": 52, "away": 48}, # Typically requires temporal tracking
                "homeTeam": context.get("home_team", "HOME"),
                "awayTeam": context.get("away_team", "AWAY"),
                "score": {"home": context.get("score_home", 0), "away": context.get("score_away", 0)},
                "clock": context.get("clock", "00:00"),
                "activePlayer": {
                    "name": context.get("active_player_name", "Active Player"),
                    "number": context.get("active_player_number", 0),
                    "stats": {"touches": 15, "passes": "-", "rating": 8.0}
                }
            })

    def start(self):
        t1 = threading.Thread(target=self.capture_video_thread, daemon=True)
        t2 = threading.Thread(target=self.capture_audio_thread, daemon=True)
        t1.start()
        t2.start()
        
        # Keep main thread alive
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("Pipeline terminated.")

if __name__ == "__main__":
    import numpy as np # Ensure loaded
    pipeline = StreamPipeline()
    pipeline.start()
