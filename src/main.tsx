import { App } from '~app/App';
import { assertIsNonNullable } from '~utils/helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import './styles/fonts.css';

const rootElement = document.querySelector('#root');

assertIsNonNullable(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
