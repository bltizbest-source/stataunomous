import React, { useState, useEffect } from 'react';
import LiveBackground from './components/LiveBackground';
import MatchDashboard from './components/MatchDashboard';
import ImmersiveTakeover from './components/ImmersiveTakeover';
import './index.css';

function App() {
  const [eventData, setEventData] = useState({
    possession: { home: 50, away: 50 },
    homeTeam: 'STADIA',
    awayTeam: 'VISION',
    score: { home: 0, away: 0 },
    clock: '--:--',
    activePlayer: {
      name: 'Scanning Live Match...',
      number: 0,
      stats: { touches: 0, passes: '0/0', rating: 0.0 }
    }
  });

  const [isGoal, setIsGoal] = useState(false);

  useEffect(() => {
    let lastPulse = null;

    const pullData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/latest_event');
        const data = await response.json();
        
        if (data.event_type !== 'none') {
            setEventData(data);
            
            // Check if this is a newly generated goal event
            const dataHash = JSON.stringify(data);
            if (data.event_type === 'goal' && lastPulse !== dataHash) {
                lastPulse = dataHash;
                setIsGoal(true);
                setTimeout(() => setIsGoal(false), 6000); 
            }
        }
      } catch (e) {
        console.error("API sync error:", e);
      }
    };

    pullData(); // init
    const interval = setInterval(pullData, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <LiveBackground />
      {!isGoal && eventData && <MatchDashboard data={eventData} />}
      {isGoal && <ImmersiveTakeover team={eventData.homeTeam} player={eventData.activePlayer.name} />}
    </div>
  );
}

export default App;
