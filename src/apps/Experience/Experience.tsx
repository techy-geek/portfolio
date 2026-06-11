import React from 'react';

const EXPERIENCE_DATA = [
  { role: 'Senior Software Engineer', company: 'TechNova Solutions', location: 'San Francisco, CA (Remote)', period: 'Jan 2023 – Present', color: '#0078d4', emoji: '🏢', highlights: ['Architected and deployed a highly scalable microservices platform using Node.js and Docker.', 'Reduced initial page load time by 40% through Next.js SSR and strategic caching.', 'Mentored 3 junior developers and led weekly engineering learning sessions.'] },
  { role: 'Full Stack Developer', company: 'CloudScale Inc', location: 'New York, NY', period: 'Mar 2020 – Dec 2022', color: '#744da9', emoji: '☁️', highlights: ['Developed and maintained multiple React-based dashboards for enterprise clients.', 'Integrated Stripe payment gateway, handling over $1M in monthly transactions.', 'Migrated legacy monolithic backend to serverless AWS Lambda functions.'] },
  { role: 'Frontend Web Intern', company: 'Creative Web Agency', location: 'Austin, TX', period: 'Jun 2019 – Feb 2020', color: '#107c10', emoji: '🎨', highlights: ['Built responsive, pixel-perfect landing pages using HTML, CSS, and vanilla JavaScript.', 'Collaborated with the design team to ensure UI consistency and accessibility standards.'] },
];

export const Experience: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>💼 Work Experience</span>
    </div>
    <div className="win-app-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {EXPERIENCE_DATA.map((exp, idx) => (
        <div key={idx} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)', display: 'flex' }}>
          <div style={{ width: '4px', background: exp.color, flexShrink: 0 }} />
          <div style={{ flex: 1, padding: '16px 18px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px' }}>{exp.emoji}</span>
                  <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--app-text)' }}>{exp.role}</h2>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--app-text-sec)', fontWeight: 500 }}>{exp.company}</p>
              </div>
              <div style={{ background: 'var(--app-meta-bg)', border: '1px solid var(--app-meta-border)', borderRadius: '6px', padding: '5px 10px', textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--app-text)', whiteSpace: 'nowrap' }}>{exp.period}</div>
                <div style={{ fontSize: '11px', color: 'var(--app-text-sec)', whiteSpace: 'nowrap' }}>{exp.location}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--app-sep)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {exp.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: exp.color, marginTop: '6px', flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--app-text-sec)', lineHeight: '1.55' }}>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
