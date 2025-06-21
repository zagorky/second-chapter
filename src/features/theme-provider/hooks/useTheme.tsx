import { use } from 'react';

import { ThemeProviderContext } from '../components/themeProviderContext';

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  return context;
};
