import React, { useEffect, useState } from 'react';

const ImmersiveTakeover = ({ team, player }) => {
  const [scale, setScale] = useState(0.8);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 50);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15), rgba(0,0,0,0.95))',
      backdropFilter: 'blur(20px)',
      opacity: opacity,
      transition: 'opacity 0.6s ease-out',
      zIndex: 100
    }}>
      <h2 style={{
        color: 'var(--accent-gold)',
        fontSize: '2.5rem',
        letterSpacing: '8px',
        marginBottom: '20px',
        opacity: opacity,
        transform: `translateY(${opacity === 1 ? '0' : '20px'})`,
        transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s',
        textTransform: 'uppercase'
      }}>
        {team} SCORES
      </h2>
      
      <h1 className="text-oversized" style={{
        fontSize: '12rem',
        background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.4) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        transform: `scale(${scale})`,
        transition: 'transform 1.5s cubic-bezier(0.1, 0.9, 0.2, 1)',
        margin: 0,
        textShadow: '0px 20px 50px rgba(212,175,55,0.3)'
      }}>
        GOAL!
      </h1>

      <p style={{
        fontSize: '2rem',
        color: 'var(--text-secondary)',
        marginTop: '30px',
        fontFamily: 'var(--font-heading)',
        opacity: opacity,
        transform: `translateY(${opacity === 1 ? '0' : '20px'})`,
        transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s'
      }}>
        Scored by <span style={{ color: '#fff', fontWeight: 600 }}>{player}</span>
      </p>
    </div>
  );
};

export default ImmersiveTakeover;
