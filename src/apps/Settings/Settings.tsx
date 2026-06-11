import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore, WALLPAPERS, ACCENT_COLORS, applyAccent } from '../../store/useSettingsStore';
import { notify } from '../../store/useNotifStore';

type Section = 'personalization' | 'colors' | 'background' | 'about';

const NAV: { id: Section; icon: string; label: string }[] = [
  { id: 'personalization', icon: '🎨', label: 'Personalization'  },
  { id: 'colors',          icon: '🌈', label: 'Colors'           },
  { id: 'background',      icon: '🖼️', label: 'Background'       },
  { id: 'about',           icon: 'ℹ️', label: 'About'            },
];

export const Settings: React.FC = () => {
  const [section, setSection] = useState<Section>('personalization');
  const { isDark, toggleDark } = useThemeStore();
  const { wallpaperId, accentColor, setWallpaper, setAccent } = useSettingsStore();

  const handleAccent = (color: string) => {
    setAccent(color);
    applyAccent(color);
    notify({ title: 'Accent Color', message: 'Accent color updated', type: 'success', duration: 2500 });
  };

  const handleWallpaper = (id: typeof WALLPAPERS[number]['id']) => {
    setWallpaper(id);
    notify({ title: 'Background', message: 'Wallpaper changed', type: 'info', duration: 2500 });
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--app-bg)' }}>

      {/* Sidebar */}
      <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid var(--app-toolbar-border)', background: 'var(--app-toolbar)', padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        <div style={{ padding: '10px 12px 14px', borderBottom: '1px solid var(--app-sep)', marginBottom: '4px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--app-text)' }}>⚙️ Settings</div>
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
            <span style={{ fontSize: '16px' }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="win-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* ── Personalization ── */}
        {section === 'personalization' && (
          <>
            <SectionHeader title="Personalization" desc="Customize the look and feel of your portfolio" />

            <SettingCard title="Dark Mode" desc={isDark ? 'Currently using dark theme' : 'Currently using light theme'} icon="🌙">
              <ToggleSwitch value={isDark} onChange={toggleDark} />
            </SettingCard>

            <SettingCard title="App Theme" desc="The overall color scheme follows your dark/light mode choice" icon="🎨">
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
                    {t === 'Light' ? '☀️' : '🌙'} {t}
                  </button>
                ))}
              </div>
            </SettingCard>

            <SettingCard title="Transparency & Effects" desc="Glass morphism effects on windows and taskbar" icon="✨">
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--win-accent)', background: 'var(--app-tag-bg)', padding: '4px 12px', borderRadius: '4px', border: '1px solid var(--app-tag-border)' }}>
                Always On
              </div>
            </SettingCard>
          </>
        )}

        {/* ── Colors ── */}
        {section === 'colors' && (
          <>
            <SectionHeader title="Colors" desc="Choose your accent color" />
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
            <SectionHeader title="Background" desc="Choose your desktop wallpaper" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
              {WALLPAPERS.map(w => (
                <button key={w.id} onClick={() => handleWallpaper(w.id)}
                  style={{
                    border: 'none', padding: 0, cursor: 'pointer', borderRadius: '8px',
                    outline: wallpaperId === w.id ? `3px solid var(--win-accent)` : '2px solid transparent',
                    outlineOffset: '2px', overflow: 'hidden', transition: 'transform 0.15s, outline 0.15s',
                    transform: wallpaperId === w.id ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: wallpaperId === w.id ? '0 4px 16px rgba(0,120,212,0.3)' : 'var(--app-card-shadow)',
                  }}
                >
                  <div style={{
                    width: '100%', aspectRatio: '16/9',
                    background: w.css ? w.value : undefined,
                    backgroundImage: !w.css ? w.value : undefined,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  <div style={{ padding: '6px 8px', background: 'var(--app-card)', fontSize: '11px', fontWeight: 600, color: 'var(--app-text)', textAlign: 'center' }}>
                    {w.label}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── About ── */}
        {section === 'about' && (
          <>
            <SectionHeader title="About" desc="Portfolio system information" />
            {[
              { label: '👤 Developer',    value: 'Anurag Sharma' },
              { label: '💻 Framework',    value: 'React 18 + TypeScript 5' },
              { label: '🎨 UI Library',   value: 'Framer Motion + Custom CSS' },
              { label: '🗄️ State',        value: 'Zustand v5' },
              { label: '📦 Bundler',      value: 'Vite 8' },
              { label: '🌐 Theme',        value: 'Windows 11 (custom)' },
              { label: '📅 Version',      value: 'v2.0 — 2026' },
              { label: '📧 Contact',      value: 'hello@anurag.dev' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '6px', boxShadow: 'var(--app-card-shadow)' }}>
                <span style={{ fontSize: '13px', color: 'var(--app-text-sec)' }}>{row.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>{row.value}</span>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

/* ── Sub-components ── */
const SectionHeader: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--app-sep)', marginBottom: '4px' }}>
    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--app-text)' }}>{title}</h2>
    <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--app-text-sec)' }}>{desc}</p>
  </div>
);

const SettingCard: React.FC<{ title: string; desc: string; icon: string; children: React.ReactNode }> = ({ title, desc, icon, children }) => (
  <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '14px 16px', boxShadow: 'var(--app-card-shadow)', display: 'flex', alignItems: 'center', gap: '14px' }}>
    <span style={{ fontSize: '22px', flexShrink: 0 }}>{icon}</span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--app-text)' }}>{title}</div>
      <div style={{ fontSize: '12px', color: 'var(--app-text-sec)', marginTop: '2px' }}>{desc}</div>
    </div>
    {children}
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
