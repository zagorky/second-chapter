import { API_CONFIG } from '../config/apiConfig';

export const getBaseFlowConfig = () => ({
  host: API_CONFIG.AUTH_URL,
  projectKey: API_CONFIG.PROJECT_KEY,
  scopes: API_CONFIG.SCOPES,
  credentials: {
    clientId: API_CONFIG.CLIENT_ID,
    clientSecret: API_CONFIG.CLIENT_SECRET,
  },
});
