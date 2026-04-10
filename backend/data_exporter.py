"""
Data Exporter
Logs event streams out to disk for the UI to consume.
"""

import json
import os
import time

def export_event(data):
    """
    Saves a localized timestamped JSON file.
    In production, this also pairs a 4K PNG with the identical timestamp.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ts = int(time.time())
    file_path = os.path.join(base_dir, 'data', 'events', f'event_{ts}.json')
    
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Exported dataset: {file_path}")
