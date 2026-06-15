import React from 'react';
import profileImg from '../../assets/profile.png';

export const About: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    {/* Toolbar */}
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>About Me</span>
    </div>

    <div className="win-app-content" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Hero Card */}
      <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', boxShadow: 'var(--app-card-shadow)', padding: '22px' }}>
        <div className="win-hero-card">
          <div style={{ width: '88px', height: '88px', flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(145deg, #0078d4, #005a9e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', boxShadow: '0 4px 16px rgba(0,120,212,0.3)' }}>

            <img src={profileImg} alt="Anurag Sharma" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700, color: 'var(--app-text)' }}>Anurag Sharma</h1>
            <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#0078d4', fontWeight: 600 }}>CS Undergrad @ NIT Silchar · Full-Stack Developer</p>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--app-text-sec)' }}>
              B.Tech Computer Science student at NIT Silchar (CGPA 8.25) with hands-on experience building production web applications. Currently interning at Underrated Academia and contributing to ICRAME-2026. Passionate about full-stack development, LLMs, and crafting immersive user experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="win-grid-2">
        {[
          { val: '6+', label: 'Projects' },
          { val: '700+', label: 'Problems Solved' },
          { val: '8.25', label: 'CGPA' },
          { val: '2', label: 'Experiences' }
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '16px 12px', textAlign: 'center', boxShadow: 'var(--app-card-shadow)' }}>
            <div style={{ fontSize: '19px', fontWeight: 700, color: 'var(--app-text)', marginBottom: '2px' }}>{s.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--app-text-sec)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="win-grid-2">
        <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px', boxShadow: 'var(--app-card-shadow)' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>Career Goals</h3>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--app-text-sec)' }}>
            To build impactful, production-ready software from AI-driven platforms to scalable full-stack systems. I aim to deepen expertise in LLM integrations, backend orchestration, and eventually contribute to products used by millions.
          </p>
        </div>
        <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px', boxShadow: 'var(--app-card-shadow)' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>Core Technologies</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Python', 'C++', 'Zustand', 'Convex', 'Framer Motion'].map(t => (
              <span key={t} className="win-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);
