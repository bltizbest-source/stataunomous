import React from 'react';

const MatchDashboard = ({ data }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '40px', pointerEvents: 'none' }}>
      
      {/* Header Overlay */}
      <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
        <h1 className="text-oversized text-gradient" style={{ margin: 0, fontSize: '4.5rem' }}>MATCH</h1>
        <h1 className="text-oversized text-gradient" style={{ margin: 0, fontSize: '4.5rem', marginTop: '-10px' }}>ANALYSIS</h1>
        <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          LIVE FEED • {data.clock}
        </p>
      </div>

      {/* Main Score Widget */}
      <div className="liquid-glass" style={{ position: 'absolute', top: '50px', right: '50px', width: '380px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>{data.homeTeam}</h2>
            <h1 style={{ fontSize: '4rem', margin: '10px 0', color: 'var(--accent-gold)' }}>{data.score.home}</h1>
          </div>
          <div style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>-</div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>{data.awayTeam}</h2>
            <h1 style={{ fontSize: '4rem', margin: '10px 0', color: '#fff' }}>{data.score.away}</h1>
          </div>
        </div>
      </div>

      {/* Player Performance Widget */}
      <div className="liquid-glass" style={{ position: 'absolute', bottom: '50px', left: '50px', width: '420px', padding: '30px', animation: 'float 6s ease-in-out infinite' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '1px' }}>PLAYER IN FOCUS</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), #888)', marginRight: '20px' }} />
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{data.activePlayer.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No. {data.activePlayer.number}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Rating</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.activePlayer.stats.rating}</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Touches</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.activePlayer.stats.touches}</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Passes</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-gold)' }}>{data.activePlayer.stats.passes}</p>
          </div>
        </div>
      </div>

      {/* Possession Widget */}
      <div className="liquid-glass" style={{ position: 'absolute', bottom: '50px', right: '50px', width: '380px', padding: '30px', animation: 'float 7s ease-in-out infinite alternate' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '1px' }}>POSSESSION</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: '600' }}>{data.possession.home}%</span>
          <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600' }}>{data.possession.away}%</span>
        </div>
        <div style={{ height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${data.possession.home}%`, background: 'var(--accent-gold)', height: '100%' }} />
          <div style={{ width: `${data.possession.away}%`, background: '#fff', height: '100%' }} />
        </div>
      </div>

    </div>
  );
};

export default MatchDashboard;
