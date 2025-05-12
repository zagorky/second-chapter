import { App } from '~app/App';
import { assertIsNonNullable } from '~utils/helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { apiInstance } from './app/API/apiBuilder';
import './index.css';
import './styles/fonts.css';

const rootElement = document.querySelector('#root');

assertIsNonNullable(rootElement);

try {
  await apiInstance.init();

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('[API] Failed to initialize API instance:', error);
}
