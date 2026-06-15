import React from 'react';

import mockmateImg from '../../assets/mockmate.png';
import portfolioImg from '../../assets/portfolio.png';
import icrameImg from '../../assets/icrame.png';
import leettrackerImg from '../../assets/leettracker.png';
import parinamImg from '../../assets/parinam.png';
import nitshackImg from '../../assets/nitshack.png';
const PROJECT_DATA = [
  {
    title: 'MockMate',
    description: 'AI Interview Platform (IIT Bombay Techfest Top 10). Engineered an AI-driven interview simulator using Next.js 14 and TypeScript, integrating LLM-based workflows for automated question generation and evaluation. Reduced speech-to-text latency by 15% via n8n and Convex orchestration.',
    tech: ['Next.js 14', 'TypeScript', 'Convex DB', 'Clerk', 'n8n', 'ArcJet'],
    github: 'https://github.com/techy-geek',
    live: 'https://mock-mate-2-0-nu.vercel.app/',
    color: '#0078d4',
    image: mockmateImg,
  },
  {
    title: 'Portfolio OS',
    description: 'Desktop Emulator-Based Portfolio. Developed a Windows-like OS emulator in React 19 and TypeScript to showcase projects in an immersive web interface. Built a custom layout engine using Tailwind v4 and CSS variables for dynamic light/dark mode with Zustand for multi-window lifecycle states.',
    tech: ['React 19', 'TypeScript', 'Framer Motion', 'Zustand', 'Lucide React', 'Web APIs'],
    github: 'https://github.com/techy-geek',
    live: 'https://anuragnits.vercel.app/',
    color: '#744da9',
    image: portfolioImg,
  }, {
    title: 'ICRAME 2026',
    description: 'International Conference on Recent Advancement in Mechanical Engineering. Designed and developed a professional conference website using HTML5, CSS3, JavaScript, and Bootstrap5. Implemented a responsive layout, dynamic UI components, and event management features.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap5'],
    github: 'https://github.com/techy-geek/ICRAME_2026',
    live: 'https://techy-geek.github.io/ICRAME_2026/',
    color: '#d4a804ff',
    image: icrameImg,
  },{
    title: 'Leet Tracker',
    description: 'Track your leetcode progress and stay motivated.',
    tech: ['Next.js 14', 'TypeScript', 'HTML', 'CSS', 'JS', 'MongoDB'],
    github: 'https://github.com/techy-geek/LeetCode_Stalker',
    live: 'https://leettracker-delta.vercel.app//',
    color: '#00b2ffff',
    image: leettrackerImg,
  },{
    title: 'Parinaam : Second Sem Result Portal',
    description: 'It displays results of 2nd semester of our batch 2028 of NIT Silchar in a clean, readable, and organized interface that is also very easy to navigate for all of our batchmates, even those who are not very tech-savvy.',
    tech: ['HTML', 'CSS', 'JS', 'MongoDB','Express.JS','Node.js'],
    github: 'https://github.com/techy-geek/Parinaam',
    live: 'https://parinam.netlify.app/', 
    color: '#c15e1cff',
    image: parinamImg,
  },{
    title: 'NITS Hack 8.0',
    description: 'NITS HACKS is a distinguished hackathon hosted by NIT Silchar, recognized as one of the top events in northeastern India. This dynamic platform brings together tech enthusiasts, encouraging collaboration and highlighting their problem-solving expertise. Beyond just a competition, NITS HACKS focuses on cultivating essential soft skills for newcomers while offering valuable technical learning experiences for aspiring students. Participants tackle real-world challenges, guiding them in designing and developing innovative technology projects from scratch. The event not only celebrates innovation but also helps shape the future generation of tech leaders.',
    tech: ['JavaScript','React 18','React Router 6','Tailwind CSS','Vite','pnpm','Prettier','Very Strict ESLint'],
    github: 'https://github.com/gdsc-nits-org/NitsHacks-8.0',
    live: 'https://nitshacks.tecnoesis.co.in/home', 
    color: '#1c24c1ff',
    image: nitshackImg,
  },
];

export const Projects: React.FC = () => (
  <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
    <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>Projects</span>
    </div>
    <div className="win-app-content">
      <div className="win-grid-2">
        {PROJECT_DATA.map(p => (
          <div key={p.title} style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--app-card-shadow)')}>
            <div style={{ height: '60px', background: p.color, display: 'flex', alignItems: 'center', padding: '0 18px', gap: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff' }}>{p.title}</h2>
            </div>
            {p.image && (
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--app-card-border)', background: 'var(--app-hover-bg)' }}>
                <img src={p.image} alt={p.title} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            )}
            <div style={{ padding: '14px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--app-text-sec)', lineHeight: '1.6', flex: 1 }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                {p.tech.map(t => <span key={t} className="win-tag">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--app-sep)', paddingTop: '12px' }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, background: 'var(--app-meta-bg)', border: '1px solid var(--app-card-border)', borderRadius: '4px', color: 'var(--app-text)', textDecoration: 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--app-meta-bg)')}>
                  GitHub
                </a>
                <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, background: p.color, border: '1px solid transparent', borderRadius: '4px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.1s' }}
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
