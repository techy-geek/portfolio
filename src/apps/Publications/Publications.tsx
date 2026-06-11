import React from 'react';

const PUBLICATIONS_DATA = [
  { title: 'Optimizing Serverless Cold Starts in Edge Environments', journal: 'Journal of Cloud Computing Advances', date: 'Oct 2023', authors: 'Anurag Sharma, Jane Doe', abstract: 'This paper explores novel techniques for mitigating cold start latencies in serverless architectures deployed at the network edge, utilizing predictive pre-warming and optimized container snapshots.', link: '#', tags: ['Serverless', 'Edge Computing', 'Performance'] },
  { title: 'A Comparative Study of State Management in Modern Web Frameworks', journal: 'International Conference on Web Engineering (ICWE)', date: 'Jun 2022', authors: 'John Smith, Anurag Sharma', abstract: 'An in-depth analysis of state management patterns across React, Vue, and Angular, evaluating performance overhead, developer experience, and scalability in large enterprise applications.', link: '#', tags: ['Frontend', 'State Management', 'Web Engineering'] },
];

export const Publications: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>📄 Publications &amp; Research</span>
    </div>
    <div className="win-app-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {PUBLICATIONS_DATA.map((pub, idx) => (
        <div key={idx} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px 20px', boxShadow: 'var(--app-card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--app-text)', lineHeight: '1.4', flex: 1, minWidth: '180px' }}>{pub.title}</h2>
            <a href={pub.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, background: '#0078d4', color: '#fff', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#106ebe')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0078d4')}>
              ↗ Read Paper
            </a>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '12px', color: 'var(--app-text-sec)', flexWrap: 'wrap' }}>
            <span>📚 {pub.journal}</span>
            <span>📅 {pub.date}</span>
            <span>👥 {pub.authors}</span>
          </div>
          <div style={{ background: 'var(--app-code-bg)', border: '1px solid var(--app-code-border)', borderLeft: '3px solid #0078d4', borderRadius: '0 6px 6px 0', padding: '10px 12px', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--app-text-sec)', lineHeight: '1.6', fontStyle: 'italic' }}>{pub.abstract}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {pub.tags.map(tag => <span key={tag} className="win-tag">{tag}</span>)}
          </div>
        </div>
      ))}
    </div>
  </div>
);
