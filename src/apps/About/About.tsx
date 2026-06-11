import React from 'react';

export const About: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    {/* Toolbar */}
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>👤 About Me</span>
    </div>

    <div className="win-app-content" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Hero Card */}
      <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', boxShadow: 'var(--app-card-shadow)', padding: '22px' }}>
        <div className="win-hero-card">
          <div style={{ width: '88px', height: '88px', flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(145deg, #0078d4, #005a9e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', boxShadow: '0 4px 16px rgba(0,120,212,0.3)' }}>
            👤
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700, color: 'var(--app-text)' }}>Anurag Sharma</h1>
            <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#0078d4', fontWeight: 600 }}>Software Engineer &amp; UI/UX Enthusiast</p>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--app-text-sec)' }}>
              I build interactive, high-performance web applications with a focus on exceptional user experiences.
              Passionate about clean code, modern design systems, and pushing the boundaries of what's possible on the web.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="win-grid-4">
        {[
          { emoji: '💻', val: '15+',    label: 'Projects'     },
          { emoji: '🧠', val: '500+',   label: 'DSA Solved'   },
          { emoji: '🏆', val: '3 Wins', label: 'Hackathons'   },
          { emoji: '📄', val: '2',      label: 'Publications' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '16px 12px', textAlign: 'center', boxShadow: 'var(--app-card-shadow)' }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{s.emoji}</div>
            <div style={{ fontSize: '19px', fontWeight: 700, color: 'var(--app-text)', marginBottom: '2px' }}>{s.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--app-text-sec)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="win-grid-2">
        <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px', boxShadow: 'var(--app-card-shadow)' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>🎯 Career Goals</h3>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--app-text-sec)' }}>
            To work on impactful products that solve real-world problems. I aim to master full-stack architecture
            and eventually lead teams to build scalable, resilient, and beautifully designed software systems.
          </p>
        </div>
        <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px', boxShadow: 'var(--app-card-shadow)' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>⚙️ Core Technologies</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker'].map(t => (
              <span key={t} className="win-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);
