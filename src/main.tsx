import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "~app/App.tsx";
import {assertIsNonNullable} from "~utils/helpers.ts";
import './index.css'

const rootElement = document.querySelector('#root');
assertIsNonNullable(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
