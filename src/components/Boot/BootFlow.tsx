import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore, WALLPAPERS } from '../../store/useSettingsStore';
import profileImg from '../../assets/profile.png';

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
type Phase = 'boot' | 'lock' | 'signin' | 'desktop';

/* ═══════════════════════════════════════════════════════════
   Clock hook
   ═══════════════════════════════════════════════════════════ */
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

/* ═══════════════════════════════════════════════════════════
   Boot Screen — Windows 11 spinner + logo
   ═══════════════════════════════════════════════════════════ */
const BootScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '48px',
      }}
    >
      {/* Windows 11 logo — 4 coloured squares */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}
      >
        {['#F35325', '#81BC06', '#05A6F0', '#FFBA08'].map((c, i) => (
          <div key={i} style={{ width: '44px', height: '44px', background: c, borderRadius: '3px' }} />
        ))}
      </motion.div>

      {/* Spinner — 5 dots orbiting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        style={{ position: 'relative', width: '40px', height: '40px' }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.14 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            }}
          >
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: `rgba(255,255,255,${0.3 + i * 0.14})`,
              marginTop: '0px',
            }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Lock Screen
   ═══════════════════════════════════════════════════════════ */
const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const now   = useClock();
  const [hintVisible, setHintVisible] = useState(false);
  const { wallpaperId } = useSettingsStore();
  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId) ?? WALLPAPERS[0];
  const bgStyle = wallpaper.css
    ? { background: wallpaper.value }
    : { backgroundImage: wallpaper.value, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const };

  useEffect(() => {
    const t = setTimeout(() => setHintVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div
      key="lock"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
      onClick={onUnlock}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        ...bgStyle,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none',
        gap: '12px',
      }}
    >
      {/* Blurred overlay — no solid tint, just blur */}
      <div style={{
        position: 'absolute', inset: 0,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(0,0,0,0.15)',
      }} />

      {/* Time + Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        style={{ position: 'relative', textAlign: 'center' }}
      >
        <div style={{
          fontSize: 'clamp(64px, 12vw, 108px)',
          fontWeight: 300, color: '#fff',
          letterSpacing: '-2px',
          textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          lineHeight: 1,
        }}>
          {timeStr}
        </div>
        <div style={{
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'rgba(255,255,255,0.88)',
          fontWeight: 400, marginTop: '10px',
          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
        }}>
          {dateStr}
        </div>
      </motion.div>

      {/* Swipe-up hint */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', bottom: '48px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
              Click anywhere to unlock
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Sign-in Screen
   ═══════════════════════════════════════════════════════════ */
const SignInScreen: React.FC<{ onSignIn: () => void }> = ({ onSignIn }) => {
  const now    = useClock();
  const [pin, setPin]           = useState('');
  const [shake, setShake]       = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
  };

  const submit = () => {
    if (signingIn) return;
    if (pin === '' || pin.length > 0) {
      // Accept any PIN (or no PIN) — it's a portfolio
      setSigningIn(true);
      setTimeout(onSignIn, 900);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');
    }
  };

  const { wallpaperId } = useSettingsStore();
  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId) ?? WALLPAPERS[0];
  const bgStyle = wallpaper.css
    ? { background: wallpaper.value }
    : { backgroundImage: wallpaper.value, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const };

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9997,
        ...bgStyle,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Blur overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(24px)' }} />

      {/* Clock top-left */}
      <div style={{ position: 'absolute', top: '32px', left: '40px', color: '#fff', opacity: 0.7 }}>
        <div style={{ fontSize: '20px', fontWeight: 300 }}>{timeStr}</div>
        <div style={{ fontSize: '12px' }}>{dateStr}</div>
      </div>

      {/* Sign-in card */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        }}
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          style={{
            width: '100px', height: '100px', borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.15)',
          }}
        >
          <img src={profileImg} alt="Anurag Sharma" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: '20px', fontWeight: 500, color: '#fff', marginBottom: '2px' }}>
            Anurag Sharma
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Portfolio</div>
        </motion.div>

        {/* PIN input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '240px' }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              ref={inputRef}
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={handleKey}
              placeholder="PIN (press Enter to skip)"
              disabled={signingIn}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '4px',
                padding: '9px 42px 9px 14px',
                fontSize: '13px',
                color: '#fff',
                outline: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, background 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            />
            {/* Arrow submit button */}
            <button
              onClick={submit}
              disabled={signingIn}
              style={{
                position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)',
                width: '30px', height: '28px',
                background: signingIn ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.20)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '3px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
            >
              {signingIn ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '12px', height: '12px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                />
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={submit}
            style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            Sign in without PIN →
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Main export — orchestrates all screens
   ═══════════════════════════════════════════════════════════ */
interface BootFlowProps {
  onComplete: () => void;
}

export const BootFlow: React.FC<BootFlowProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('boot');

  return (
    <AnimatePresence mode="wait">
      {phase === 'boot' && (
        <BootScreen key="boot" onDone={() => setPhase('lock')} />
      )}
      {phase === 'lock' && (
        <LockScreen key="lock" onUnlock={() => setPhase('signin')} />
      )}
      {phase === 'signin' && (
        <SignInScreen key="signin" onSignIn={onComplete} />
      )}
    </AnimatePresence>
  );
};
