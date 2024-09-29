import { createContext, useState } from 'react';

const ModeContext = createContext({
  mode: '',
  toggleMode: () => {},
});

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('metric');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'metric' ? 'imperial' : 'metric'));
  };

  const modeCtx = {
    mode,
    toggleMode,
  };

  return <ModeContext.Provider value={modeCtx}>{children}</ModeContext.Provider>;
};

export default ModeContext;
