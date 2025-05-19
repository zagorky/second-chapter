import { apiInstance } from '~app/API/apiBuilder';
import { App } from '~app/App';
import { useAppStore } from '~stores/store';
import { assertIsNonNullable } from '~utils/helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import './index.css';
import './styles/fonts.css';
import { ErrorFallback } from './components/ui/error-fallback/errorFallback';

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
      <App />
    </ErrorBoundary>
  </StrictMode>
);
