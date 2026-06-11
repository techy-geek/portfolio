import React, { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '../../store/useWindowStore';

type LineType = 'input' | 'output' | 'error' | 'success' | 'info' | 'neofetch';
interface Line { type: LineType; text: string }

const NEOFETCH_LINES = [
  { label: 'OS',       val: 'Portfolio OS 11  (Windows 11 theme)' },
  { label: 'Host',     val: 'Anurag Sharma — Software Engineer' },
  { label: 'Kernel',   val: 'React 18 + TypeScript 5' },
  { label: 'Shell',    val: 'Portfolio Terminal v1.0' },
  { label: 'DE',       val: 'Windows 11 (custom)' },
  { label: 'CPU',      val: 'Brain @ ∞ GHz (curiosity-cooled)' },
  { label: 'Memory',   val: '500+ DSA problems solved' },
  { label: 'Uptime',   val: '3+ years professional experience' },
  { label: 'Packages', val: 'React · Node.js · TypeScript · Docker · AWS' },
  { label: 'Contact',  val: 'hello@anurag.dev' },
];

export const Terminal: React.FC = () => {
  const { openWindow } = useWindowStore();

  const COMMANDS: Record<string, (args?: string[]) => Line[]> = {
    help: () => [
      { type: 'info',    text: '┌─ Available Commands ──────────────────────────────┐' },
      { type: 'output',  text: '│  whoami        About me                           │' },
      { type: 'output',  text: '│  ls            List projects                      │' },
      { type: 'output',  text: '│  cat about     Full bio                           │' },
      { type: 'output',  text: '│  cat skills    Technologies                       │' },
      { type: 'output',  text: '│  cat contact   Contact info                       │' },
      { type: 'output',  text: '│  git log       Recent commits                     │' },
      { type: 'output',  text: '│  git status    Working tree status                │' },
      { type: 'output',  text: '│  neofetch      System info                        │' },
      { type: 'output',  text: '│  open <app>    Open an app window                 │' },
      { type: 'output',  text: '│  date          Current date & time                │' },
      { type: 'output',  text: '│  echo <text>   Print text                         │' },
      { type: 'output',  text: '│  clear         Clear terminal   (Ctrl+L)          │' },
      { type: 'info',    text: '└───────────────────────────────────────────────────┘' },
    ],
    whoami: () => [
      { type: 'success', text: 'Anurag Sharma' },
      { type: 'output',  text: 'Software Engineer & UI/UX Enthusiast' },
      { type: 'output',  text: '📍 Open to new opportunities  •  hello@anurag.dev' },
    ],
    ls: () => [
      { type: 'info',    text: 'drwxr-xr-x  projects/' },
      { type: 'output',  text: '  🔐 authfolio/    – Auth boilerplate (React, Node.js, MongoDB)' },
      { type: 'output',  text: '  ☁️  syncsky/      – Real-time collab editor (Next.js, Socket.io)' },
      { type: 'output',  text: '  🏥 nirogkaaya/   – Healthcare system (React, Firebase)' },
      { type: 'output',  text: '  📝 codesnipp/    – Code snippet platform (Vue.js, Supabase)' },
    ],
    'cat about': () => [
      { type: 'info',    text: '# ~/about.txt' },
      { type: 'output',  text: '' },
      { type: 'output',  text: 'Name    : Anurag Sharma' },
      { type: 'output',  text: 'Role    : Software Engineer & UI/UX Enthusiast' },
      { type: 'output',  text: 'Stack   : React, TypeScript, Node.js, Next.js, Docker, AWS' },
      { type: 'output',  text: '' },
      { type: 'output',  text: 'Building interactive, high-performance web apps with' },
      { type: 'output',  text: 'a focus on exceptional user experiences.' },
    ],
    'cat skills': () => [
      { type: 'info',    text: '# ~/skills.txt' },
      { type: 'output',  text: '' },
      { type: 'success', text: 'Frontend   React/Next.js ▓▓▓▓▓▓▓▓▓░ 90%' },
      { type: 'success', text: '           TypeScript   ▓▓▓▓▓▓▓▓░░ 85%' },
      { type: 'success', text: '           Tailwind CSS ▓▓▓▓▓▓▓▓▓▓ 95%' },
      { type: 'output',  text: '' },
      { type: 'success', text: 'Backend    Node.js      ▓▓▓▓▓▓▓▓▓░ 88%' },
      { type: 'success', text: '           PostgreSQL   ▓▓▓▓▓▓▓▓░░ 80%' },
      { type: 'output',  text: '' },
      { type: 'success', text: 'DevOps     Docker       ▓▓▓▓▓▓▓░░░ 75%' },
      { type: 'success', text: '           AWS          ▓▓▓▓▓▓░░░░ 65%' },
    ],
    'cat contact': () => [
      { type: 'info',    text: '# ~/contact.txt' },
      { type: 'output',  text: '' },
      { type: 'output',  text: '📧  hello@anurag.dev' },
      { type: 'output',  text: '🐙  github.com/anurag-sharma' },
      { type: 'output',  text: '💼  linkedin.com/in/anuragsharma' },
      { type: 'output',  text: '🐦  @anurag_dev' },
    ],
    'git log': () => [
      { type: 'success', text: 'commit a3f9c2e  (HEAD → main)' },
      { type: 'output',  text: 'Author: Anurag Sharma <hello@anurag.dev>' },
      { type: 'output',  text: 'Date:   Sat Jun 7 2026' },
      { type: 'output',  text: '    ✨ feat: add Terminal, Dark Mode & Context Menu' },
      { type: 'output',  text: '' },
      { type: 'success', text: 'commit 7d2b1a0' },
      { type: 'output',  text: 'Author: Anurag Sharma <hello@anurag.dev>' },
      { type: 'output',  text: 'Date:   Fri Jun 6 2026' },
      { type: 'output',  text: '    🎨 style: polish animations & boot flow' },
      { type: 'output',  text: '' },
      { type: 'success', text: 'commit 4c8e3f1' },
      { type: 'output',  text: 'Author: Anurag Sharma <hello@anurag.dev>' },
      { type: 'output',  text: 'Date:   Thu Jun 5 2026' },
      { type: 'output',  text: '    🚀 feat: Windows 11 portfolio desktop' },
    ],
    'git status': () => [
      { type: 'success', text: 'On branch main — up to date with origin/main' },
      { type: 'output',  text: 'nothing to commit, working tree clean ✓' },
    ],
    neofetch: () => [{ type: 'neofetch', text: '' }],
    date: () => [{ type: 'output', text: new Date().toString() }],
  };

  const APP_MAP: Record<string, [string, string]> = {
    about: ['about', 'About Me'], projects: ['projects', 'Projects'],
    skills: ['skills', 'Skills'], experience: ['experience', 'Experience'],
    publications: ['publications', 'Publications'], certifications: ['certifications', 'Certifications'],
    resume: ['resume', 'Resume.pdf'], contact: ['contact', 'Contact'],
  };

  const [lines, setLines] = useState<Line[]>([
    { type: 'success', text: '   ____           _    __       _ _' },
    { type: 'success', text: '  |  _ \\ ___  _ _| |_ / _| ___ | (_) ___' },
    { type: 'success', text: "  | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\" },
    { type: 'success', text: '  |  __/ (_) | |  | |_|  _| (_) | | | (_) |' },
    { type: 'success', text: "  |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/" },
    { type: 'output',  text: '' },
    { type: 'info',    text: '  Portfolio Terminal v1.0  —  Anurag Sharma' },
    { type: 'output',  text: "  Type 'help' to see available commands.\n" },
  ]);
  const [input, setInput]           = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setCmdHistory(h => [trimmed, ...h.slice(0, 49)]);
    setHistIdx(-1);
    const inputLine: Line = { type: 'input', text: trimmed };

    if (trimmed === 'clear') { setLines([]); setInput(''); return; }

    if (trimmed.startsWith('echo ')) {
      setLines(l => [...l, inputLine, { type: 'output', text: trimmed.slice(5) }]);
      setInput(''); return;
    }

    if (trimmed.startsWith('open ')) {
      const app = trimmed.slice(5).trim().toLowerCase();
      const entry = APP_MAP[app];
      if (entry) {
        openWindow(entry[0], entry[1]);
        setLines(l => [...l, inputLine, { type: 'success', text: `Opening ${entry[1]}…` }]);
      } else {
        setLines(l => [...l, inputLine,
          { type: 'error', text: `open: app '${app}' not found.` },
          { type: 'output', text: `Available: ${Object.keys(APP_MAP).join(', ')}` },
        ]);
      }
      setInput(''); return;
    }

    const fn = COMMANDS[trimmed];
    if (fn) {
      setLines(l => [...l, inputLine, ...fn()]);
    } else {
      setLines(l => [...l, inputLine, { type: 'error', text: `command not found: ${trimmed}  (try 'help')` }]);
    }
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(n); setInput(cmdHistory[n] ?? ''); }
    if (e.key === 'ArrowDown') { e.preventDefault(); const n = Math.max(histIdx - 1, -1); setHistIdx(n); setInput(n === -1 ? '' : cmdHistory[n]); }
    if (e.ctrlKey && e.key === 'l') { e.preventDefault(); setLines([]); }
  };

  const COLOR: Record<LineType, string> = {
    input: '#4fc3f7', output: 'rgba(255,255,255,0.80)',
    error: '#f28b82', success: '#81c995', info: '#fdd663', neofetch: 'transparent',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0c0c0c', fontFamily: "'Cascadia Code','Fira Code','Consolas',monospace" }}
      onClick={() => inputRef.current?.focus()}>
      {/* Inner tab strip */}
      <div style={{ height: '32px', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)', marginLeft: '4px' }}>portfolio — terminal</span>
      </div>

      <div className="win-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {lines.map((line, i) => {
          if (line.type === 'neofetch') return (
            <div key={i} style={{ display: 'flex', gap: '24px', margin: '8px 0', flexWrap: 'wrap' }}>
              <pre style={{ margin: 0, fontSize: '11px', color: '#4fc3f7', lineHeight: '1.5', flexShrink: 0 }}>{
`  ██████╗  ██████╗ ██████╗ ████████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
  ██████╔╝██║   ██║██████╔╝   ██║   
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   
  ██║     ╚██████╔╝██║  ██║   ██║   
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   `}
              </pre>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center' }}>
                {NEOFETCH_LINES.map((row, j) => (
                  <div key={j} style={{ fontSize: '12px', lineHeight: '1.6' }}>
                    <span style={{ color: '#4fc3f7', fontWeight: 700, display: 'inline-block', width: '80px' }}>{row.label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)' }}>: {row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
          return (
            <div key={i} style={{ display: 'flex', fontSize: '13px', lineHeight: '1.55', alignItems: 'flex-start' }}>
              {line.type === 'input' && <span style={{ color: '#81c995', marginRight: '8px', flexShrink: 0, whiteSpace: 'nowrap' }}>anurag@portfolio:~$</span>}
              <span style={{ color: COLOR[line.type], whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line.text}</span>
            </div>
          );
        })}

        {/* Live input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          <span style={{ color: '#81c995', fontSize: '13px', flexShrink: 0, whiteSpace: 'nowrap' }}>anurag@portfolio:~$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#4fc3f7', fontSize: '13px', fontFamily: 'inherit', caretColor: '#4fc3f7' }}
            autoComplete="off" spellCheck={false} />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
