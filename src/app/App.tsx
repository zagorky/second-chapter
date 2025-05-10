import { AppRouter } from '~app/router';
import { ThemeProvider } from '~features/theme-provider/components/themeProvider';
import { RouterProvider } from 'react-router/dom';

import { Toaster } from '~/components/ui/sonner';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={AppRouter} />
      <Toaster />
    </ThemeProvider>
  );
};
