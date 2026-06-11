import React from 'react';

const PROJECT_DATA = [
  { title: 'AuthFolio',  description: 'A comprehensive authentication boilerplate with role-based access control, JWT, and OAuth integrations.', tech: ['React', 'Node.js', 'Express', 'MongoDB'],       github: '#', live: '#', color: '#0078d4', emoji: '🔐' },
  { title: 'SyncSky',    description: 'Real-time collaborative workspace and document editor built with WebSockets and CRDTs.',                  tech: ['Next.js', 'TypeScript', 'Socket.io', 'Redis'], github: '#', live: '#', color: '#744da9', emoji: '☁️' },
  { title: 'NirogKaaya', description: 'Healthcare management system for clinics to handle patient records, appointments, and billing.',           tech: ['React', 'Firebase', 'Material UI'],             github: '#', live: '#', color: '#107c10', emoji: '🏥' },
  { title: 'CodeSnipp',  description: 'A platform to share and discover useful code snippets with syntax highlighting and collections.',          tech: ['Vue.js', 'Supabase', 'Tailwind CSS'],           github: '#', live: '#', color: '#ca5010', emoji: '📝' },
];

export const Projects: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>📁 Projects</span>
    </div>
    <div className="win-app-content">
      <div className="win-grid-2">
        {PROJECT_DATA.map(p => (
          <div key={p.title} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--app-card-shadow)')}>
            <div style={{ height: '60px', background: p.color, display: 'flex', alignItems: 'center', padding: '0 18px', gap: '12px' }}>
              <span style={{ fontSize: '26px' }}>{p.emoji}</span>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff' }}>{p.title}</h2>
            </div>
            <div style={{ padding: '14px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--app-text-sec)', lineHeight: '1.6', flex: 1 }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                {p.tech.map(t => <span key={t} className="win-tag">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--app-sep)', paddingTop: '12px' }}>
                <a href={p.github} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, background: 'var(--app-meta-bg)', border: '1px solid var(--app-card-border)', borderRadius: '4px', color: 'var(--app-text)', textDecoration: 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--app-meta-bg)')}>
                  🔗 GitHub
                </a>
                <a href={p.live} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, background: p.color, border: '1px solid transparent', borderRadius: '4px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  ↗ Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
