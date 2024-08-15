import React, { createContext, useContext, useState } from 'react';

const Theme = createContext();

export const useTheme = () => useContext(Theme);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};
