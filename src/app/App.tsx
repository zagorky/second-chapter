import { AppRouter } from '~app/router';
import { ThemeProvider } from '~features/theme-provider/components/themeProvider';
import { RouterProvider } from 'react-router/dom';
import { SWRConfig } from 'swr';

import { Toaster } from '~/components/ui/sonner';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SWRConfig
        value={{
          dedupingInterval: 3000,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          errorRetryCount: 0,
        }}
      >
        <RouterProvider router={AppRouter} />
      </SWRConfig>
      <Toaster />
    </ThemeProvider>
  );
};
