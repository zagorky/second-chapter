import { createApiBuilderFromCtpClient, type Customer } from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions, type UserAuthOptions, type Client } from '@commercetools/ts-client';
import { useAppStore } from '~stores/store';

import { API_CONFIG } from '~/app/API/config/apiConfig';

import { createTokenCache } from './utils/createTokenCache';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_CONFIG.API_URL,
  httpClient: fetch,
};

const getBaseFlowConfig = () => {
  return {
    host: API_CONFIG.AUTH_URL,
    projectKey: API_CONFIG.PROJECT_KEY,
    scopes: API_CONFIG.SCOPES,
    tokenCache: createTokenCache(),
    credentials: {
      clientId: API_CONFIG.CLIENT_ID,
      clientSecret: API_CONFIG.CLIENT_SECRET,
    },
  };
};

export class ApiBuilder {
  private client: Client;

  private readonly baseFlowConfig = getBaseFlowConfig();

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

  public async login(
    user: UserAuthOptions
  ): Promise<{ success: true; payload: Customer } | { success: false; error: unknown }> {
    const previousClient = this.client;

    this.client = this.buildBase()
      .withPasswordFlow({
        ...this.baseFlowConfig,
        credentials: {
          ...this.baseFlowConfig.credentials,
          user,
        },
      })
      .build();

    try {
      const { body: payload } = await createApiBuilderFromCtpClient(this.client)
        .withProjectKey({ projectKey: API_CONFIG.PROJECT_KEY })
        .me()
        .get()
        .execute();

      useAppStore.getState().setIsAuthenticated(true);

      return { success: true, payload };
    } catch (error: unknown) {
      this.client = previousClient;

      return { success: false, error };
    }
  }

  public logout(): void {
    useAppStore.getState().setIsAuthenticated(false);
    this.client = this.buildAnonymousClient(this.buildBase());
  }

  private buildBase(): ClientBuilder {
    return new ClientBuilder().withProjectKey(API_CONFIG.PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions);
  }

  private buildAnonymousClient(client: ClientBuilder, anonymousId?: string) {
    return client
      .withAnonymousSessionFlow({
        ...this.baseFlowConfig,
        credentials: {
          ...this.baseFlowConfig.credentials,
          anonymousId,
        },
      })
      .build();
  }

  private buildExistingTokenClient(client: ClientBuilder, accessToken: string) {
    return client.withExistingTokenFlow(`Bearer ${accessToken}`, { force: true }).build();
  }
}
