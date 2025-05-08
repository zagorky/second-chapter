import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions, type UserAuthOptions, type Client } from '@commercetools/ts-client';
import { useAppStore } from '~stores/store';

import { API_CONFIG } from '~/app/API/config/apiConfig';

import { API_ERRORS } from './config/apiErrors';
import { createTokenCache } from './utils/createTokenCache';
import { parseApiErrorMessage } from './utils/parseApiErrorMessage';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_CONFIG.API_URL,
  httpClient: fetch,
};

export class ApiBuilder {
  private client: Client;

  constructor() {
    const storedToken = useAppStore.getState().store;

    const clientBase: ClientBuilder = this.buildBase();

    this.client =
      storedToken.refreshToken && storedToken.token
        ? this.buildExistingTokenClient(clientBase, storedToken.token)
        : this.buildAnonymousClient(clientBase);
  }

  public get root() {
    return createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY });
  }

  public async login(user: UserAuthOptions): Promise<{ success: boolean; errorMessage?: string }> {
    const previousClient = this.client;

    this.client = this.buildBase()
      .withPasswordFlow({
        host: API_CONFIG.AUTH_URL,
        projectKey: API_CONFIG.PROJECT_KEY,
        credentials: {
          clientId: API_CONFIG.CLIENT_ID,
          clientSecret: API_CONFIG.CLIENT_SECRET,
          user,
        },
        tokenCache: createTokenCache(),
        scopes: API_CONFIG.SCOPES,
      })
      .build();

    try {
      await createApiBuilderFromCtpClient(this.client)
        .withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY })
        .me()
        .get()
        .execute()
        .then(() => {
          useAppStore.getState().setIsAuthenticated(true);
        });

      return { success: true };
    } catch (error: unknown) {
      this.client = previousClient;

      const errorMessage = parseApiErrorMessage(error, API_ERRORS.LOGIN_UNKNOWN);

      return { success: false, errorMessage: errorMessage };
    }
  }

  public logout(): void {
    useAppStore.getState().setIsAuthenticated(false);
    this.client = this.buildAnonymousClient(this.buildBase());
  }

  private buildBase(): ClientBuilder {
    return new ClientBuilder().withProjectKey(API_CONFIG.PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions);
  }

  private buildAnonymousClient(client: ClientBuilder) {
    console.log('anonymous client build');

    return client
      .withAnonymousSessionFlow({
        host: API_CONFIG.AUTH_URL,
        projectKey: API_CONFIG.PROJECT_KEY,
        credentials: {
          clientId: API_CONFIG.CLIENT_ID,
          clientSecret: API_CONFIG.CLIENT_SECRET,
        },
        scopes: API_CONFIG.SCOPES,
        tokenCache: createTokenCache(),
      })
      .build();
  }

  private buildExistingTokenClient(client: ClientBuilder, accessToken: string) {
    return client.withExistingTokenFlow(`Bearer ${accessToken}`, { force: true }).build();
  }
}
