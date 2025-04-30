import { App } from '~app/App.tsx';
import { assertIsNonNullable } from '~utils/helpers.ts';
import { StrictMode } from 'react';

import './index.css';

import { createRoot } from 'react-dom/client';

const rootElement = document.querySelector('#root');

assertIsNonNullable(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
