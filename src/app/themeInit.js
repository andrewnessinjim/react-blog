import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

export const themeInitExecutableString =
  /* js */
  `function getInitialColorTheme() {
      const persistedColorPreference =
      window.localStorage.getItem('color-theme');
      const hasPersistedPreference =
      typeof persistedColorPreference === 'string';
      
      if (hasPersistedPreference) {
        return persistedColorPreference;
        }
        
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }
        
        return 'light';
      }
      
      function applyTheme(tokens) {
        Object.entries(tokens).forEach(([cssVar, value]) => {
          document.documentElement.style.setProperty(cssVar, value);
        });
      }
      function setDataColorTheme(theme) {
        document.documentElement.setAttribute("data-color-theme", theme);
      }
      
      const theme = getInitialColorTheme();

      setDataColorTheme(theme);
      applyTheme(theme === 'dark' ? ${JSON.stringify(
        DARK_TOKENS
      )} : ${JSON.stringify(LIGHT_TOKENS)});
`;
