import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore, WALLPAPERS, ACCENT_COLORS, applyAccent } from '../../store/useSettingsStore';

type Section = 'personalization' | 'colors' | 'background' | 'about' | null;

const NAV: { id: Exclude<Section, null>; label: string }[] = [
  { id: 'personalization', label: 'Personalization' },
  { id: 'colors',          label: 'Colors'          },
  { id: 'background',      label: 'Background'      },
  { id: 'about',           label: 'About'           },
];

export const Settings: React.FC = () => {
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < 640);
  const [section, setSection] = useState<Section>(() => {
    return window.innerWidth < 640 ? null : 'personalization';
  });
  const { isDark, toggleDark } = useThemeStore();
  const { wallpaperId, accentColor, setWallpaper, setAccent } = useSettingsStore();

  const handleAccent = (color: string) => {
    setAccent(color);
    applyAccent(color);
  };

  const handleWallpaper = (id: typeof WALLPAPERS[number]['id']) => {
    setWallpaper(id);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isNarrow && section === null) {
      setSection('personalization');
    }
  }, [isNarrow, section]);

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--app-bg)' }}>

      {/* Sidebar */}
      {(!isNarrow || section === null) && (
        <div style={{
          width: isNarrow ? '100%' : '220px',
          flexShrink: 0,
          borderRight: isNarrow ? 'none' : '1px solid var(--app-toolbar-border)',
          background: 'var(--app-toolbar)',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '10px 12px 14px', borderBottom: '1px solid var(--app-sep)', marginBottom: '4px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--app-text)' }}>Settings</div>
            <div style={{ fontSize: '11px', color: 'var(--app-text-sec)', marginTop: '2px' }}>Portfolio v2.0</div>
          </div>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '6px', border: 'none',
                background: section === n.id ? 'var(--app-tag-bg)' : 'transparent',
                color: section === n.id ? 'var(--win-accent)' : 'var(--app-text)',
                fontWeight: section === n.id ? 700 : 500,
                fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.1s, color 0.1s',
                outline: 'none',
                borderLeft: section === n.id ? '3px solid var(--win-accent)' : '3px solid transparent',
              }}
              onMouseEnter={e => { if (section !== n.id) (e.currentTarget.style.background = 'var(--app-hover-bg)'); }}
              onMouseLeave={e => { if (section !== n.id) (e.currentTarget.style.background = 'transparent'); }}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {(!isNarrow || section !== null) && (
        <div className="win-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: isNarrow ? '16px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ── Personalization ── */}
          {section === 'personalization' && (
            <>
              <SectionHeader title="Personalization" desc="Customize the look and feel of your portfolio" onBack={isNarrow ? () => setSection(null) : undefined} />

              <SettingCard title="Dark Mode" desc={isDark ? 'Currently using dark theme' : 'Currently using light theme'} isNarrow={isNarrow}>
                <ToggleSwitch value={isDark} onChange={toggleDark} />
              </SettingCard>

              <SettingCard title="App Theme" desc="The overall color scheme follows your dark/light mode choice" isNarrow={isNarrow}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Light', 'Dark'].map(t => (
                    <button key={t} onClick={() => { if ((t === 'Dark') !== isDark) toggleDark(); }}
                      style={{
                        padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                        border: `1.5px solid ${(t === 'Dark') === isDark ? 'var(--win-accent)' : 'var(--app-card-border)'}`,
                        background: (t === 'Dark') === isDark ? 'var(--app-tag-bg)' : 'var(--app-card)',
                        color: (t === 'Dark') === isDark ? 'var(--win-accent)' : 'var(--app-text)',
                        cursor: 'pointer', outline: 'none', transition: 'all 0.15s',
                      }}>
                      {t === 'Light' ? 'Light' : 'Dark'}
                    </button>
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Transparency & Effects" desc="Glass morphism effects on windows and taskbar" isNarrow={isNarrow}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--win-accent)', background: 'var(--app-tag-bg)', padding: '4px 12px', borderRadius: '4px', border: '1px solid var(--app-tag-border)' }}>
                  Always On
                </div>
              </SettingCard>
            </>
          )}

          {/* ── Colors ── */}
          {section === 'colors' && (
            <>
              <SectionHeader title="Colors" desc="Choose your accent color" onBack={isNarrow ? () => setSection(null) : undefined} />
              <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '20px', boxShadow: 'var(--app-card-shadow)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-text-sec)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Accent Color
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {ACCENT_COLORS.map(ac => (
                    <button key={ac.value} onClick={() => handleAccent(ac.value)} title={ac.name}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: ac.value, border: 'none', cursor: 'pointer',
                        outline: accentColor === ac.value ? `3px solid ${ac.value}` : '2px solid transparent',
                        outlineOffset: '2px',
                        transition: 'transform 0.15s, outline 0.15s',
                        transform: accentColor === ac.value ? 'scale(1.15)' : 'scale(1)',
                        boxShadow: accentColor === ac.value ? `0 0 10px ${ac.value}70` : 'none',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--app-meta-bg)', border: '1px solid var(--app-meta-border)', borderRadius: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}60`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--app-text)' }}>
                      {ACCENT_COLORS.find(a => a.value === accentColor)?.name ?? 'Custom'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--app-text-sec)', fontFamily: 'monospace' }}>
                      {accentColor}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Background ── */}
          {section === 'background' && (
            <>
              <SectionHeader title="Background" desc="Choose your desktop wallpaper" onBack={isNarrow ? () => setSection(null) : undefined} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {WALLPAPERS.map((w, i) => (
                  <button key={w.id} onClick={() => handleWallpaper(w.id)}
                    style={{
                      border: 'none', padding: 0, cursor: 'pointer', borderRadius: '10px',
                      outline: wallpaperId === w.id ? `3px solid var(--win-accent)` : '2px solid transparent',
                      outlineOffset: '3px', overflow: 'hidden', transition: 'transform 0.15s, outline 0.15s',
                      transform: wallpaperId === w.id ? 'scale(1.04)' : 'scale(1)',
                      boxShadow: wallpaperId === w.id ? '0 4px 16px rgba(0,120,212,0.3)' : 'var(--app-card-shadow)',
                    }}
                  >
                    <div style={{
                      width: '100%', aspectRatio: '16/9',
                      backgroundImage: w.value,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <div style={{ padding: '6px 8px', background: 'var(--app-card)', fontSize: '11px', fontWeight: 600, color: 'var(--app-text)', textAlign: 'center' }}>
                      {i + 1}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── About ── */}
          {section === 'about' && (
            <>
              <SectionHeader title="About" desc="Portfolio system information" onBack={isNarrow ? () => setSection(null) : undefined} />
              {[
                { label: 'Developer',  value: 'Anurag Sharma' },
                { label: 'Framework',  value: 'React 18 + TypeScript 5' },
                { label: 'UI Library', value: 'Framer Motion + Custom CSS' },
                { label: 'State',      value: 'Zustand v5' },
                { label: 'Bundler',    value: 'Vite 8' },
                { label: 'Theme',      value: 'Windows 11 (custom)' },
                { label: 'Version',    value: 'v2.0 — 2026' },
                { label: 'Contact',    value: 'anuragsharma.nits@gmail.com' },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex',
                  flexDirection: isNarrow ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isNarrow ? 'flex-start' : 'center',
                  gap: isNarrow ? '4px' : '12px',
                  padding: '12px 16px',
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-card-border)',
                  borderRadius: '6px',
                  boxShadow: 'var(--app-card-shadow)'
                }}>
                  <span style={{ fontSize: '13px', color: 'var(--app-text-sec)' }}>{row.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)', wordBreak: 'break-all' }}>{row.value}</span>
                </div>
              ))}
            </>
          )}

        </div>
      )}
    </div>
  );
};

/* ── Sub-components ── */
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '32px', height: '32px',
        borderRadius: '50%',
        border: 'none',
        background: hov ? 'var(--app-hover-bg)' : 'transparent',
        color: 'var(--app-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s',
        outline: 'none',
        marginRight: '8px',
        flexShrink: 0,
      }}
    >
      <BackIcon />
    </button>
  );
};

const SectionHeader: React.FC<{ title: string; desc: string; onBack?: () => void }> = ({ title, desc, onBack }) => (
  <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--app-sep)', marginBottom: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {onBack && <BackBtn onClick={onBack} />}
      <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--app-text)' }}>{title}</h2>
    </div>
    <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--app-text-sec)', paddingLeft: onBack ? '40px' : '0' }}>{desc}</p>
  </div>
);

const SettingCard: React.FC<{ title: string; desc: string; isNarrow?: boolean; children: React.ReactNode }> = ({ title, desc, isNarrow, children }) => (
  <div style={{
    background: 'var(--app-card)',
    border: '1px solid var(--app-card-border)',
    borderRadius: '8px',
    padding: '14px 16px',
    boxShadow: 'var(--app-card-shadow)',
    display: 'flex',
    flexDirection: isNarrow ? 'column' : 'row',
    alignItems: isNarrow ? 'flex-start' : 'center',
    gap: isNarrow ? '12px' : '14px',
    justifyContent: 'space-between'
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>{title}</div>
      <div style={{ fontSize: '12px', color: 'var(--app-text-sec)', marginTop: '2px', lineHeight: '1.4' }}>{desc}</div>
    </div>
    <div style={{ flexShrink: 0, width: isNarrow ? '100%' : 'auto', display: 'flex', justifyContent: isNarrow ? 'flex-start' : 'flex-end' }}>
      {children}
    </div>
  </div>
);

const ToggleSwitch: React.FC<{ value: boolean; onChange: () => void }> = ({ value, onChange }) => (
  <button onClick={onChange} style={{
    width: '44px', height: '24px', borderRadius: '100px', border: 'none', cursor: 'pointer', flexShrink: 0,
    background: value ? 'var(--win-accent)' : 'var(--app-progress-bg)',
    position: 'relative', transition: 'background 0.2s', outline: 'none',
  }}>
    <span style={{
      position: 'absolute', top: '3px',
      left: value ? '23px' : '3px',
      width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
      transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    }} />
  </button>
);
