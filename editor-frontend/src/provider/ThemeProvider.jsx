import { createContext, useContext, useMemo, useState } from 'react';

import { getTheme } from '../theme/Theme';

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  const value = useMemo(
    () => ({
      theme,
      isDarkMode,
      setIsDarkMode,
    }),
    [theme, isDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};

export default ThemeProvider;
