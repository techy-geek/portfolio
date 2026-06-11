import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';

// Search Item Schema
interface SearchItem {
  id: string;
  title: string;
  type: 'App' | 'Project' | 'Skill' | 'Experience' | 'Publication';
  emoji: string;
  subtext: string;
  keywords: string[];
}

// Map app IDs to their exact Window titles
const APP_NAMES: Record<string, string> = {
  about: 'About Me',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  publications: 'Publications',
  certifications: 'Certifications',
  resume: 'Resume.pdf',
  contact: 'Contact',
  terminal: 'Terminal',
  settings: 'Settings'
};

const SEARCH_DATA: SearchItem[] = [
  // Apps
  { id: 'about', title: 'About Me', type: 'App', emoji: '👤', subtext: 'System App • Personal profile & introduction', keywords: ['about', 'me', 'bio', 'whoami', 'anurag', 'sharma', 'profile'] },
  { id: 'projects', title: 'Projects', type: 'App', emoji: '📁', subtext: 'System App • Software development portfolio', keywords: ['projects', 'apps', 'portfolio', 'code', 'github', 'live'] },
  { id: 'skills', title: 'Skills', type: 'App', emoji: '⚡', subtext: 'System App • Technical competencies & tools', keywords: ['skills', 'technologies', 'stack', 'languages', 'databases', 'devops'] },
  { id: 'experience', title: 'Experience', type: 'App', emoji: '💼', subtext: 'System App • Work history & achievements', keywords: ['experience', 'work', 'jobs', 'resume', 'history', 'career'] },
  { id: 'publications', title: 'Publications', type: 'App', emoji: '📄', subtext: 'System App • Research papers & academic works', keywords: ['publications', 'research', 'papers', 'journals', 'academic'] },
  { id: 'certifications', title: 'Certifications', type: 'App', emoji: '🏆', subtext: 'System App • Professional badges & courses', keywords: ['certifications', 'awards', 'courses', 'badges', 'licenses'] },
  { id: 'resume', title: 'Resume.pdf', type: 'App', emoji: '📋', subtext: 'System App • Curriculum vitae document', keywords: ['resume', 'cv', 'pdf', 'hire', 'download'] },
  { id: 'contact', title: 'Contact', type: 'App', emoji: '✉️', subtext: 'System App • Email & social communication', keywords: ['contact', 'email', 'socials', 'message', 'reach', 'github', 'linkedin'] },
  { id: 'terminal', title: 'Terminal', type: 'App', emoji: '🖥️', subtext: 'System App • Command line interface shell', keywords: ['terminal', 'cmd', 'shell', 'bash', 'command', 'cli'] },
  { id: 'settings', title: 'Settings', type: 'App', emoji: '⚙️', subtext: 'System App • Background, theme, and colors', keywords: ['settings', 'preferences', 'theme', 'dark', 'light', 'accent', 'wallpaper'] },

  // Projects
  { id: 'projects', title: 'AuthFolio', type: 'Project', emoji: '🔐', subtext: 'Project • Auth boilerplate (React, Node, Express, MongoDB)', keywords: ['authfolio', 'auth', 'authentication', 'boilerplate', 'jwt', 'oauth', 'role', 'rbac', 'mongodb', 'node', 'express'] },
  { id: 'projects', title: 'SyncSky', type: 'Project', emoji: '☁️', subtext: 'Project • Real-time editor (Next.js, Socket.io, Redis, CRDTs)', keywords: ['syncsky', 'real-time', 'collaborative', 'editor', 'websockets', 'socket.io', 'redis', 'crdt', 'nextjs', 'typescript'] },
  { id: 'projects', title: 'NirogKaaya', type: 'Project', emoji: '🏥', subtext: 'Project • Healthcare clinic manager (React, Firebase, MUI)', keywords: ['nirogkaaya', 'healthcare', 'clinic', 'medical', 'records', 'billing', 'firebase', 'material', 'react'] },
  { id: 'projects', title: 'CodeSnipp', type: 'Project', emoji: '📝', subtext: 'Project • Snippet sharing platform (Vue, Supabase, Tailwind)', keywords: ['codesnipp', 'snippets', 'share', 'code', 'syntax', 'vue', 'supabase', 'tailwind'] },

  // Skills
  { id: 'skills', title: 'React / Next.js', type: 'Skill', emoji: '🖥️', subtext: 'Frontend Skill • 90% proficiency', keywords: ['react', 'nextjs', 'frontend', 'components', 'ssr', 'hooks'] },
  { id: 'skills', title: 'TypeScript', type: 'Skill', emoji: '🖥️', subtext: 'Frontend Skill • 85% proficiency', keywords: ['typescript', 'ts', 'types', 'type safety', 'javascript'] },
  { id: 'skills', title: 'Tailwind CSS', type: 'Skill', emoji: '🖥️', subtext: 'Frontend Skill • 95% proficiency', keywords: ['tailwind', 'css', 'styles', 'responsive', 'utility'] },
  { id: 'skills', title: 'Vue.js', type: 'Skill', emoji: '🖥️', subtext: 'Frontend Skill • 75% proficiency', keywords: ['vue', 'vuejs', 'frontend', 'options', 'composition'] },
  { id: 'skills', title: 'Node.js / Express', type: 'Skill', emoji: '⚙️', subtext: 'Backend Skill • 88% proficiency', keywords: ['node', 'nodejs', 'express', 'backend', 'api', 'server'] },
  { id: 'skills', title: 'PostgreSQL', type: 'Skill', emoji: '⚙️', subtext: 'Backend Skill • 80% proficiency', keywords: ['postgresql', 'postgres', 'sql', 'database', 'relational'] },
  { id: 'skills', title: 'MongoDB', type: 'Skill', emoji: '⚙️', subtext: 'Backend Skill • 85% proficiency', keywords: ['mongodb', 'mongo', 'nosql', 'database', 'document'] },
  { id: 'skills', title: 'GraphQL', type: 'Skill', emoji: '⚙️', subtext: 'Backend Skill • 70% proficiency', keywords: ['graphql', 'gql', 'api', 'queries', 'mutations'] },
  { id: 'skills', title: 'Git & GitHub', type: 'Skill', emoji: '🛠️', subtext: 'Tools Skill • 92% proficiency', keywords: ['git', 'github', 'version control', 'commits', 'pr'] },
  { id: 'skills', title: 'Docker', type: 'Skill', emoji: '🛠️', subtext: 'Tools Skill • 75% proficiency', keywords: ['docker', 'containers', 'dockerfile', 'images', 'devops'] },
  { id: 'skills', title: 'AWS', type: 'Skill', emoji: '🛠️', subtext: 'Tools Skill • 65% proficiency', keywords: ['aws', 'amazon', 'cloud', 's3', 'ec2', 'lambda'] },
  { id: 'skills', title: 'CI/CD Pipeline', type: 'Skill', emoji: '🛠️', subtext: 'Tools Skill • 70% proficiency', keywords: ['cicd', 'actions', 'deploy', 'pipeline', 'automation'] },

  // Experience
  { id: 'experience', title: 'Senior Software Engineer', type: 'Experience', emoji: '💼', subtext: 'Experience • TechNova Solutions (San Francisco, CA)', keywords: ['senior', 'engineer', 'technova', 'solutions', 'microservices', 'ssr', 'caching', 'mentor', 'architect'] },
  { id: 'experience', title: 'Full Stack Developer', type: 'Experience', emoji: '💼', subtext: 'Experience • CloudScale Inc (New York, NY)', keywords: ['fullstack', 'developer', 'cloudscale', 'dashboards', 'stripe', 'payments', 'aws', 'lambda', 'serverless'] },
  { id: 'experience', title: 'Frontend Web Intern', type: 'Experience', emoji: '💼', subtext: 'Experience • Creative Web Agency (Austin, TX)', keywords: ['intern', 'frontend', 'creative', 'web', 'agency', 'landing', 'html', 'css', 'javascript'] },

  // Publications
  { id: 'publications', title: 'Optimizing Serverless Cold Starts', type: 'Publication', emoji: '📄', subtext: 'Publication • Journal of Cloud Computing Advances', keywords: ['cold starts', 'serverless', 'edge', 'computing', 'pre-warming', 'container', 'snapshots'] },
  { id: 'publications', title: 'State Management in Modern Web Frameworks', type: 'Publication', emoji: '📄', subtext: 'Publication • ICWE Conference', keywords: ['state management', 'web frameworks', 'react', 'vue', 'angular', 'comparative', 'study'] }
];

const SEARCH_TABS = ['All', 'Apps', 'Projects', 'Skills'] as const;
type SearchTab = typeof SEARCH_TABS[number];

interface SearchPopupProps {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
}

export const SearchPopup: React.FC<SearchPopupProps> = ({ query, setQuery, onClose }) => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [activeTab, setActiveTab] = useState<SearchTab>('All');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Resize detector to handle layout transitions dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autofocus the input when popup opens on mobile
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isMobile]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Prevent closing if we are clicking on the taskbar search bar input or container itself
      if (
        popupRef.current && 
        !popupRef.current.contains(target) &&
        !target.closest('#taskbar-search')
      ) {
        onClose();
      }
    };
    // Add small delay to prevent immediate closing during open action trigger
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle key listeners for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Filter items matching the query & selected tab
  const getFilteredItems = (): SearchItem[] => {
    const q = query.trim().toLowerCase();
    
    // First, filter by tab category
    let items = SEARCH_DATA;
    if (activeTab === 'Apps') {
      items = SEARCH_DATA.filter((item) => item.type === 'App');
    } else if (activeTab === 'Projects') {
      items = SEARCH_DATA.filter((item) => item.type === 'Project');
    } else if (activeTab === 'Skills') {
      items = SEARCH_DATA.filter((item) => item.type === 'Skill');
    }

    if (!q) return items;

    // Filter by query matches
    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subtextMatch = item.subtext.toLowerCase().includes(q);
      const typeMatch = item.type.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((kw) => kw.includes(q));
      return titleMatch || subtextMatch || typeMatch || keywordMatch;
    });
  };

  const filteredItems = getFilteredItems();

  // Reset active index when query or tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query, activeTab]);

  // Handle Enter/Up/Down keys on input/popup focus
  const handlePopupKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = filteredItems[activeIndex];
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    openWindow(item.id, APP_NAMES[item.id] || item.title);
    onClose();
  };

  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <strong key={i} style={{ color: 'var(--win-accent)', fontWeight: 600 }}>{part}</strong>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Quick searches list (when query is empty)
  const quickSearches = [
    { label: 'Read About Anurag', app: 'about', emoji: '👤' },
    { label: 'View Tech Projects', app: 'projects', emoji: '📁' },
    { label: 'Open Command Terminal', app: 'terminal', emoji: '🖥️' },
    { label: 'Download Resume PDF', app: 'resume', emoji: '📋' },
    { label: 'Get in Touch / Contact', app: 'contact', emoji: '✉️' }
  ];

  // Best Match calculation (first item of current results)
  const bestMatch = query.trim() && filteredItems.length > 0 ? filteredItems[0] : null;
  const otherResults = bestMatch ? filteredItems.slice(1) : filteredItems;

  return (
    <motion.div
      ref={popupRef}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] } }}
      exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.12 } }}
      onKeyDown={handlePopupKeyDown}
      style={{
        position: 'absolute',
        bottom: '52px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '560px',
        maxWidth: 'calc(100vw - 24px)',
        background: 'var(--win-bg-flyout)',
        backdropFilter: 'blur(50px) saturate(180%)',
        WebkitBackdropFilter: 'blur(50px) saturate(180%)',
        borderRadius: '12px',
        border: '1px solid var(--win-stroke-card)',
        boxShadow: 'var(--win-shadow-flyout)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── Search Input (Mobile Only) ── */}
      {isMobile && (
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--app-input-bg)',
            border: '1px solid var(--app-input-border)',
            borderRadius: '6px',
            padding: '8px 12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}>
            <span style={{ color: 'var(--app-text-sec)', fontSize: '14px', flexShrink: 0 }}>🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--app-text)',
                fontSize: '13px',
                fontFamily: 'inherit',
              }}
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--app-text-sec)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  padding: '2px',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Tabs Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '4px 16px 0' : '12px 16px 0',
        borderBottom: '1px solid var(--win-stroke-divider)',
        gap: '4px',
      }}>
        {SEARCH_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px 8px',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--app-text)' : 'var(--app-text-sec)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.1s',
                outline: 'none',
              }}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '12px',
                    right: '12px',
                    height: '3px',
                    background: 'var(--win-accent)',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Main Results Panel ── */}
      <div 
        className="win-scrollbar"
        style={{
          padding: '16px',
          maxHeight: '360px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {query.trim() === '' ? (
          /* ════ EMPTY QUERY STATE ════ */
          <>
            {/* Top Apps Row */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Top Apps
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {SEARCH_DATA.slice(0, 5).map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleSelectItem(app)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 4px',
                      borderRadius: '6px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: '24px' }}>{app.emoji}</span>
                    <span style={{ fontSize: '11px', color: 'var(--app-text)', fontWeight: 500, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                      {app.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Searches */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quick Searches
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {quickSearches.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const found = SEARCH_DATA.find((item) => item.id === qs.app && item.type === 'App');
                      if (found) handleSelectItem(found);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.12s',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: '15px' }}>{qs.emoji}</span>
                    <span style={{ fontSize: '12px', color: 'var(--app-text)', fontWeight: 500 }}>
                      {qs.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ════ ACTIVE SEARCH RESULTS ════ */
          <>
            {filteredItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Best Match Section */}
                {bestMatch && (
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Best Match
                    </h3>
                    <div
                      onClick={() => handleSelectItem(bestMatch)}
                      style={{
                        padding: '16px',
                        background: activeIndex === 0 ? 'var(--app-hover-bg)' : 'var(--app-card)',
                        border: '1px solid var(--win-stroke-card)',
                        borderRadius: '8px',
                        boxShadow: 'var(--app-card-shadow)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'background 0.12s, transform 0.1s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                      onMouseLeave={(e) => {
                        if (activeIndex !== 0) e.currentTarget.style.background = 'var(--app-card)';
                      }}
                    >
                      <div style={{
                        fontSize: '36px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--app-badge-bg)',
                        borderRadius: '8px',
                      }}>
                        {bestMatch.emoji}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--app-text)' }}>
                          {highlightMatch(bestMatch.title, query)}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--win-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          {bestMatch.type}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--app-text-sec)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {bestMatch.subtext}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Results list */}
                {otherResults.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Search Results
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {otherResults.map((item, idx) => {
                        const actualIdx = bestMatch ? idx + 1 : idx;
                        const isFocused = activeIndex === actualIdx;
                        return (
                          <div
                            key={`${item.id}-${item.title}`}
                            onClick={() => handleSelectItem(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              background: isFocused ? 'var(--app-hover-bg)' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.12s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                            onMouseLeave={(e) => {
                              if (!isFocused) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                              <span style={{ fontSize: '12px', color: 'var(--app-text)', fontWeight: 600 }}>
                                {highlightMatch(item.title, query)}
                              </span>
                              <span style={{ fontSize: '11px', color: 'var(--app-text-sec)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.subtext}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No results state */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '160px',
                color: 'var(--app-text-ter)',
                gap: '8px',
              }}>
                <span style={{ fontSize: '32px' }}>🔍</span>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>No results found</span>
                <span style={{ fontSize: '11px', color: 'var(--app-text-ter)' }}>Try searching for a project name, skill, or app</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: 'var(--win-bg-secondary)',
        padding: '10px 16px',
        borderTop: '1px solid var(--win-stroke-divider)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'var(--app-text-sec)',
      }}>
        <span>Search local portfolio</span>
        <span style={{ opacity: 0.8 }}>Use Arrow keys & Enter</span>
      </div>
    </motion.div>
  );
};
