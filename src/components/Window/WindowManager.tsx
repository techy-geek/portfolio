import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Window } from './Window';
import { About }          from '../../apps/About/About';
import { Projects }       from '../../apps/Projects/Projects';
import { Resume }         from '../../apps/Resume/Resume';
import { Skills }         from '../../apps/Skills/Skills';
import { Experience }     from '../../apps/Experience/Experience';
import { Contact }        from '../../apps/Contact/Contact';
import { Terminal }       from '../../apps/Terminal/Terminal';
import { Settings }       from '../../apps/Settings/Settings';

export const WindowManager: React.FC = () => {
  const windows = useWindowStore(s => s.windows);

  const renderApp = (id: string) => {
    switch (id) {
      case 'about':          return <About />;
      case 'projects':       return <Projects />;
      case 'resume':         return <Resume />;
      case 'skills':         return <Skills />;
      case 'experience':     return <Experience />;
      case 'contact':        return <Contact />;
      case 'terminal':       return <Terminal />;
      case 'settings':       return <Settings />;
      default: return <div style={{ padding: '32px', color: 'var(--app-text)' }}>App '{id}' not found.</div>;
    }
  };

  return (
    <>
      {windows.map(w => (
        <Window key={w.id} id={w.id} title={w.title}>
          {renderApp(w.id)}
        </Window>
      ))}
    </>
  );
};
