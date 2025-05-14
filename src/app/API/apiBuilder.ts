import {
  createApiBuilderFromCtpClient,
  type Customer,
  type ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions, type UserAuthOptions, type Client } from '@commercetools/ts-client';
import { useAppStore } from '~stores/store';

import { API_CONFIG } from '~/app/API/config/apiConfig';

import { createTokenCache } from './utils/createTokenCache';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_CONFIG.API_URL,
  httpClient: fetch,
};

export class ApiBuilder {
  private client: Client;

  private readonly baseFlowConfig = this.getBaseFlowConfig();

  constructor() {
    this.client = this.buildPlaceholderClient();
  }
  public get root() {
    return createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY });
  }

  public async init() {
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
  }

  public async login(
    user: UserAuthOptions
  ): Promise<{ success: true; payload: Customer } | { success: false; error: unknown }> {
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

      return { success: false, error };
    }
  }

  public logout() {
    this.client = this.buildAnonymousClient();
  }
  private buildBase(): ClientBuilder {
    return new ClientBuilder().withProjectKey(API_CONFIG.PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions);
  }

  private updateAuthenticationStatus(isAuthenticated: boolean) {
    const store = useAppStore.getState();

    if (store.isAuthenticated !== isAuthenticated) {
      store.setIsAuthenticated(isAuthenticated);
    }
  }

  private buildPlaceholderClient(): Client {
    return this.buildBase().build();
  }

  private buildAnonymousClient() {
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
  }

  private getBaseFlowConfig() {
    return {
      host: API_CONFIG.AUTH_URL,
      projectKey: API_CONFIG.PROJECT_KEY,
      scopes: API_CONFIG.SCOPES,
      credentials: {
        clientId: API_CONFIG.CLIENT_ID,
        clientSecret: API_CONFIG.CLIENT_SECRET,
      },
    };
  }

  private async checkClientAuthStatus(client: Client): Promise<{ success: true } | { success: false; error: unknown }> {
    const authResult = await this.verifyAuthenticatedClient(client);

    if (authResult.success) {
      this.updateAuthenticationStatus(true);

      return { success: true };
    }

    this.updateAuthenticationStatus(false);
    const unauthResult = await this.verifyUnauthenticatedClient(client);

    if (unauthResult.success) {
      return { success: true };
    }

    return { success: false, error: unauthResult.error };
  }

  private async verifyAuthenticatedClient(
    client: Client
  ): Promise<{ success: true; payload: Customer } | { success: false; error: unknown }> {
    const root = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: API_CONFIG.PROJECT_KEY,
    });

    try {
      const response = await root.me().get().execute();

      return { success: true, payload: response.body };
    } catch (error: unknown) {
      return { success: false, error };
    }
  }

  private async verifyUnauthenticatedClient(
    client: Client
  ): Promise<{ success: true; payload: ProductProjectionPagedQueryResponse } | { success: false; error: unknown }> {
    const root = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: API_CONFIG.PROJECT_KEY,
    });

    try {
      const response = await root
        .productProjections()
        .get({ queryArgs: { limit: 1 } })
        .execute();

      return { success: true, payload: response.body };
    } catch (error: unknown) {
      return { success: false, error };
    }
  }

  private async buildExistingTokenClient(accessToken: string): Promise<Client> {
    const nextClient = this.buildBase().withExistingTokenFlow(`Bearer ${accessToken}`, { force: true }).build();

    const response = await this.checkClientAuthStatus(nextClient);

    if (response.success) {
      return nextClient;
    } else {
      console.error('Invalid access token from local storage', response.error);

      return this.buildAnonymousClient();
    }
  }

  private async buildRefreshTokenClient(refreshToken: string) {
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
  }
}

export const apiInstance = new ApiBuilder();
