import React from 'react';

const CERTIFICATIONS_DATA = [
  { title: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: 'Aug 2023', credentialId: 'AWS-ASA-12345',  link: '#', color: '#f8a000', emoji: '☁️' },
  { title: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera (Meta)',  date: 'Jan 2023', credentialId: 'META-FED-67890', link: '#', color: '#0078d4', emoji: '💻' },
  { title: 'Google Cloud Professional Cloud Architect',       issuer: 'Google Cloud',       date: 'Nov 2022', credentialId: 'GCP-PCA-11223',  link: '#', color: '#d13438', emoji: '🌐' },
];

export const Certifications: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>🏆 Certifications</span>
    </div>
    <div className="win-app-content">
      <div className="win-grid-3">
        {CERTIFICATIONS_DATA.map(cert => (
          <div key={cert.credentialId} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--app-card-shadow)')}>
            <div style={{ height: '68px', background: cert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px' }}>{cert.emoji}</div>
            <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <h2 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--app-text)', lineHeight: '1.4' }}>{cert.title}</h2>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--app-text-sec)' }}>
                Issued by <strong style={{ color: 'var(--app-text)' }}>{cert.issuer}</strong>
              </p>
              <div style={{ fontSize: '11px', color: 'var(--app-text-sec)' }}>
                <div>📅 {cert.date}</div>
                <div style={{ marginTop: '3px', fontFamily: 'monospace', background: 'var(--app-meta-bg)', padding: '3px 6px', borderRadius: '3px', border: '1px solid var(--app-meta-border)', fontSize: '10px', color: 'var(--app-text-sec)' }}>
                  ID: {cert.credentialId}
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                <a href={cert.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '6px', fontSize: '12px', fontWeight: 600, background: 'var(--app-meta-bg)', border: '1px solid var(--app-meta-border)', borderRadius: '4px', color: 'var(--app-text)', textDecoration: 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--app-meta-bg)')}>
                  ↗ Show Credential
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
