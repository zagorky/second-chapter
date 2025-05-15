import { createApiBuilderFromCtpClient, type Customer } from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions, type UserAuthOptions, type Client } from '@commercetools/ts-client';
import { API_CONFIG } from '~app/API/config/apiConfig';
import { useAppStore } from '~stores/store';

import { normalizeError } from '~/utils/normalizeError';

import { createTokenCache } from './utils/createTokenCache';
import { getBaseFlowConfig } from './utils/getBaseFlowConfig';
import { verifyAuthenticatedClient } from './utils/verifyAuthenticatedClient';
import { verifyUnauthenticatedClient } from './utils/verifyUnauthenticatedClient';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_CONFIG.API_URL,
  httpClient: fetch,
};

export class ApiBuilder {
  private client: Client;

  private readonly baseFlowConfig = getBaseFlowConfig();

  constructor() {
    this.client = this.buildPlaceholderClient();
  }
  public get root() {
    return createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY });
  }

  public init = async () => {
    const state = useAppStore.getState();
    const storedToken = state.tokenStore;
    const refreshToken = state.tokenStore.refreshToken ?? state.refreshToken;

    if (storedToken.token && storedToken.expirationTime > Date.now()) {
      this.client = await this.buildExistingTokenClient(storedToken.token);
    } else if (refreshToken) {
      this.client = await this.buildRefreshTokenClient(refreshToken);
    } else {
      this.client = this.buildAnonymousClient();
    }
  };

  public login = async (
    user: UserAuthOptions
  ): Promise<{ success: true; payload: Customer } | { success: false; error: Error }> => {
    const backupTokenStore = useAppStore.getState().tokenStore;

    useAppStore.getState().resetTokenStore();

    const nextClient = this.buildBase()
      .withPasswordFlow({
        ...this.baseFlowConfig,
        credentials: {
          ...this.baseFlowConfig.credentials,
          user,
        },
        tokenCache: createTokenCache(),
      })
      .build();

    try {
      const { body: payload } = await createApiBuilderFromCtpClient(nextClient)
        .withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY })
        .me()
        .get()
        .execute();

      this.updateAuthenticationStatus(true);

      this.client = nextClient;

      return { success: true, payload };
    } catch (error: unknown) {
      useAppStore.getState().setTokenStore(backupTokenStore);

      return { success: false, error: normalizeError(error) };
    }
  };

  public logout = () => {
    this.client = this.buildAnonymousClient();
  };
  private readonly buildBase = (): ClientBuilder => {
    return new ClientBuilder().withProjectKey(API_CONFIG.PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions);
  };

  private readonly updateAuthenticationStatus = (isAuthenticated: boolean) => {
    const store = useAppStore.getState();

    if (store.isAuthenticated !== isAuthenticated) {
      store.setIsAuthenticated(isAuthenticated);
    }
  };

  private readonly buildPlaceholderClient = (): Client => {
    return this.buildBase().build();
  };

  private readonly buildAnonymousClient = () => {
    useAppStore.getState().resetStore();
    this.updateAuthenticationStatus(false);

    return this.buildBase()
      .withAnonymousSessionFlow({
        ...this.baseFlowConfig,
        credentials: {
          ...this.baseFlowConfig.credentials,
        },
        tokenCache: createTokenCache(),
      })
      .build();
  };

  private readonly checkClientAuthStatus = async (
    client: Client
  ): Promise<{ success: true } | { success: false; error: Error }> => {
    const authCheckResult = await verifyAuthenticatedClient(client);

    if (authCheckResult.success) {
      this.updateAuthenticationStatus(true);

      return { success: true };
    }

    this.updateAuthenticationStatus(false);
    const unauthCheckResult = await verifyUnauthenticatedClient(client);

    if (unauthCheckResult.success) {
      return { success: true };
    }
    const { error } = unauthCheckResult;

    return { success: false, error: normalizeError(error) };
  };

  private readonly buildExistingTokenClient = async (accessToken: string): Promise<Client> => {
    const nextClient = this.buildBase().withExistingTokenFlow(`Bearer ${accessToken}`, { force: true }).build();

    const response = await this.checkClientAuthStatus(nextClient);

    if (response.success) {
      return nextClient;
    } else {
      console.error('Invalid access token from local storage', response.error);

      return this.buildAnonymousClient();
    }
  };

  private readonly buildRefreshTokenClient = async (refreshToken: string) => {
    useAppStore.getState().resetTokenStore();

    const nextClient = this.buildBase()
      .withRefreshTokenFlow({
        ...this.baseFlowConfig,
        credentials: {
          ...this.baseFlowConfig.credentials,
        },
        tokenCache: createTokenCache(),
        refreshToken,
      })
      .build();

    const response = await this.checkClientAuthStatus(nextClient);

    if (response.success) {
      useAppStore.getState().setRefreshToken(refreshToken);

      return nextClient;
    } else {
      console.error('Invalid refresh token from local storage', response.error);

      return this.buildAnonymousClient();
    }
  };
}

export const apiInstance = new ApiBuilder();
