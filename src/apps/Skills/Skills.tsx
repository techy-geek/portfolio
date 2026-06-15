import React from 'react';

const SKILLS_DATA = [
  { category: 'Languages',        color: '#0078d4', skills: [{ name: 'C++', level: 88 }, { name: 'TypeScript', level: 85 }, { name: 'JavaScript', level: 90 }, { name: 'Python', level: 78 }, { name: 'SQL', level: 80 }, { name: 'C', level: 75 }] },
  { category: 'Web Technologies', color: '#744da9', skills: [{ name: 'React / Next.js', level: 90 }, { name: 'Node.js / Express', level: 82 }, { name: 'HTML5 / CSS3', level: 92 }, { name: 'Tailwind CSS', level: 88 }, { name: 'GraphQL', level: 68 }] },
  { category: 'Tools & DevOps',   color: '#ca5010', skills: [{ name: 'Git & GitHub', level: 92 }, { name: 'Docker', level: 78 }, { name: 'AWS', level: 65 }, { name: 'Vercel', level: 85 }, { name: 'MongoDB', level: 80 }, { name: 'PostgreSQL', level: 78 }] },
  { category: 'Core CS',          color: '#107c10', skills: [{ name: 'Data Structures & Algorithms', level: 90 }, { name: 'OOPS', level: 85 }, { name: 'Computer Networks', level: 75 }, { name: 'Operating Systems', level: 72 }] },
];

export const Skills: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>Technical Skills</span>
    </div>
    <div className="win-app-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coding Profiles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { platform: 'LeetCode', username: 'anurag_nits', url: 'https://leetcode.com/anurag_nits', color: '#ffa116', rating: '680+ Problem Solved', desc: 'Active solver' },
            { platform: 'Codeforces', username: 'anurags_nits', url: 'https://codeforces.com/profile/anurags_nits', color: '#318dff', rating: '1140 Rating (Newbie)', desc: 'Competitive programming' },
            { platform: 'CodeChef', username: 'anurag_nits', url: 'https://www.codechef.com/users/anurag_nits', color: '#5b4636', rating: '2★ Max: 1516', desc: 'Contest participant' },
          ].map(profile => (
            <a key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer"
              style={{
                background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px',
                padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px', textDecoration: 'none',
                boxShadow: 'var(--app-card-shadow)', transition: 'transform 0.1s, box-shadow 0.1s', color: 'inherit'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--app-card-shadow)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>{profile.platform}</span>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: profile.color }} />
              </div>
              <div style={{ fontSize: '11px', color: '#0078d4', fontWeight: 600 }}>@{profile.username}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-text)', marginTop: '4px' }}>{profile.rating}</div>
              <div style={{ fontSize: '11px', color: 'var(--app-text-sec)' }}>{profile.desc}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="win-grid-2">
        {SKILLS_DATA.map(group => (
          <div key={group.category} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--app-sep2)', display: 'flex', alignItems: 'center', gap: '10px', background: `${group.color}0d` }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>{group.category}</span>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {group.skills.map(skill => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-text)' }}>{skill.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--app-text-sec)', fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                  <div className="win-progress-track">
                    <div className="win-progress-fill" style={{ width: `${skill.level}%`, background: group.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
