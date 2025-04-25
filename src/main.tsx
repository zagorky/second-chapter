import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {assertIsNonNullable} from "~components/shared/helpers.ts";

const rootElement = document.querySelector('#root');
assertIsNonNullable(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
