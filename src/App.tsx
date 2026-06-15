import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BootFlow } from './components/Boot/BootFlow';
import { Desktop } from './components/Desktop/Desktop';
import { useThemeStore } from './store/useThemeStore';
import { useSettingsStore, applyAccent } from './store/useSettingsStore';

function App() {
  const [booted, setBooted] = useState(false);
  const isDark = useThemeStore(s => s.isDark);
  const { accentColor } = useSettingsStore();

  /* Apply .dark class to <html> */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  /* Apply accent colour on mount & whenever it changes */
  useEffect(() => {
    applyAccent(accentColor);
  }, [accentColor]);

  const onBootComplete = () => {
    setBooted(true);
  };

  return (
    <>
      <AnimatePresence>
        {!booted && (
          <BootFlow key="boot-flow" onComplete={onBootComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
            style={{ position: 'fixed', inset: 0 }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

export default App;
