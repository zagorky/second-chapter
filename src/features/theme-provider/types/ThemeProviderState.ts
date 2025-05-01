import type { Theme } from './theme';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
