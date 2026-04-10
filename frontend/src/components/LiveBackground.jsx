import React from 'react';

const LiveBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0b0c10 0%, #1f2833 50%, #0b0c10 100%)'
    }}>
      {/* Live YouTube Iframe for actual match background */}
      <iframe
        src="https://www.youtube.com/embed/EcCM2jMqg5o?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=EcCM2jMqg5o"
        style={{
          position: 'absolute',
          top: '-20%', left: '-20%', width: '140%', height: '140%',
          pointerEvents: 'none',
          filter: 'blur(6px) brightness(0.6)',
          border: 'none',
          transform: 'scale(1.1)'
        }}
        allow="autoplay; encrypted-media"
      />
      
      {/* Dark gradient overlay for modern depth */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 12, 16, 0.8) 100%)'
      }} />
    </div>
  );
};

export default LiveBackground;
