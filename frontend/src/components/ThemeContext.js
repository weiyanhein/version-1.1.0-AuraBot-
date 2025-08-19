// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext({
//   darkMode: false,
//   toggleTheme: () => { }
// });

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedMode = localStorage.getItem('darkMode');
//     if (savedMode !== null) return savedMode === 'true';
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   const toggleTheme = () => {
//     setDarkMode(prev => {
//       const newMode = !prev;
//       localStorage.setItem('darkMode', newMode.toString());
//       return newMode;
//     });
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('darkMode', darkMode.toString());

//     // Set up system preference listener
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemChange = (e) => {
//       if (localStorage.getItem('darkMode') === null) {
//         setDarkMode(e.matches);
//       }
//     };
//     mediaQuery.addEventListener('change', handleSystemChange);

//     return () => mediaQuery.removeEventListener('change', handleSystemChange);
//   }, [darkMode]);

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => { }
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return savedMode === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());

    // Set up system preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

