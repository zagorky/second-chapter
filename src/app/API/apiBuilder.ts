import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/ts-client';
import { API_CONFIG } from '~config/apiConfig';
import { useAppStore } from '~stores/store';

import { createTokenCache } from './createTokenCache';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_CONFIG.API_URL,
  httpClient: fetch,
};

type Credentials = { username: string; password: string };

export class ApiBuilder {
  private client: ReturnType<ClientBuilder['build']>;

  constructor() {
    const storedToken = useAppStore.getState().store;

    const clientBase: ClientBuilder = this.buildBase();

    this.client =
      storedToken?.refreshToken && storedToken.token
        ? this.buildRefreshClient(clientBase, storedToken.token, storedToken.refreshToken)
        : this.buildAnonymousClient(clientBase);
  }

  public get root() {
    return createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY });
  }

  public login(user: Credentials) {
    useAppStore.getState().setIsAuthenticated(true);

    this.client = this.buildBase()
      .withPasswordFlow({
        host: API_CONFIG.AUTH_URL,
        projectKey: API_CONFIG.PROJECT_KEY,
        credentials: {
          clientId: API_CONFIG.CLIENT_ID,
          clientSecret: API_CONFIG.CLIENT_SECRET,
          user,
        },
        scopes: API_CONFIG.PASSWORD_SCOPES_WITH_KEYS,
        tokenCache: createTokenCache(),
      })
      .build();
  }

  public logout(): void {
    useAppStore.getState().setIsAuthenticated(false);
    this.client = this.buildAnonymousClient(this.buildBase());
  }

  private buildBase(): ClientBuilder {
    return new ClientBuilder().withProjectKey(API_CONFIG.PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions);
  }

  private buildAnonymousClient(client: ClientBuilder) {
    return client
      .withAnonymousSessionFlow({
        host: API_CONFIG.AUTH_URL,
        projectKey: API_CONFIG.PROJECT_KEY,
        credentials: {
          clientId: API_CONFIG.CLIENT_ID,
          clientSecret: API_CONFIG.CLIENT_SECRET,
        },
        scopes: API_CONFIG.ANONYMOUS_SCOPES_WITH_KEYS,
        tokenCache: createTokenCache(),
      })
      .build();
  }

  private buildRefreshClient(client: ClientBuilder, accessToken: string, refreshToken: string) {
    return client
      .withExistingTokenFlow(`Bearer ${accessToken}`, { force: false })
      .withRefreshTokenFlow({
        host: API_CONFIG.AUTH_URL,
        projectKey: API_CONFIG.PROJECT_KEY,
        credentials: {
          clientId: API_CONFIG.CLIENT_ID,
          clientSecret: API_CONFIG.CLIENT_SECRET,
        },
        refreshToken,
        tokenCache: createTokenCache(),
      })
      .build();
  }
}

export const Api = new ApiBuilder();
