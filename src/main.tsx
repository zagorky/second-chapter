import { apiInstance } from '~app/API/apiBuilder';
import { App } from '~app/App';
import { ErrorFallback } from '~components/ui/error-fallback/errorFallback';
import { AuthProvider } from '~features/auth-provider/authProvider';
import { useAppStore } from '~stores/store';
import { assertIsNonNullable } from '~utils/helpers';
import { StrictMode } from 'react';

import './index.css';
import './styles/fonts.css';

import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

const rootElement = document.querySelector('#root');

assertIsNonNullable(rootElement);

await useAppStore.persist.rehydrate();

await apiInstance.init();

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      onError={(error, info) => {
        console.error('Uncaught error:', error, info);
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
