import React from 'react';

const SKILLS_DATA = [
  { category: 'Frontend',     emoji: '🖥️', color: '#0078d4', skills: [{ name: 'React / Next.js', level: 90 }, { name: 'TypeScript', level: 85 }, { name: 'Tailwind CSS', level: 95 }, { name: 'Vue.js', level: 75 }] },
  { category: 'Backend',      emoji: '⚙️', color: '#744da9', skills: [{ name: 'Node.js / Express', level: 88 }, { name: 'PostgreSQL', level: 80 }, { name: 'MongoDB', level: 85 }, { name: 'GraphQL', level: 70 }] },
  { category: 'Tools & DevOps', emoji: '🛠️', color: '#ca5010', skills: [{ name: 'Git & GitHub', level: 92 }, { name: 'Docker', level: 75 }, { name: 'AWS', level: 65 }, { name: 'CI/CD Pipeline', level: 70 }] },
  { category: 'Other',        emoji: '✨', color: '#107c10', skills: [{ name: 'UI/UX Design', level: 80 }, { name: 'System Architecture', level: 75 }, { name: 'Agile/Scrum', level: 85 }, { name: 'Performance Optimization', level: 82 }] },
];

export const Skills: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>⚡ Technical Skills</span>
    </div>
    <div className="win-app-content">
      <div className="win-grid-2">
        {SKILLS_DATA.map(group => (
          <div key={group.category} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--app-sep2)', display: 'flex', alignItems: 'center', gap: '10px', background: `${group.color}0d` }}>
              <span style={{ fontSize: '18px' }}>{group.emoji}</span>
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
