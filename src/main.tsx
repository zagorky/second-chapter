import { apiInstance } from '~app/API/apiBuilder';
import { App } from '~app/App';
import { useAppStore } from '~stores/store';
import { assertIsNonNullable } from '~utils/helpers';

import './index.css';
import './styles/fonts.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.querySelector('#root');

assertIsNonNullable(rootElement);

await useAppStore.persist.rehydrate();

await apiInstance.init();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
