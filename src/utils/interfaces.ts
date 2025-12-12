export type TFilter = {
  [key: string | number]:
    | string
    | number
    | boolean
    | undefined
    | object
    | Array<string>
    | Array<object>
    | object;
};

// For server
interface IEnvironmentConfig {
  port: string | undefined;
}

interface IServerConfig {
  [key: string]: IEnvironmentConfig;
}

interface IStripeConfig {
  paymentsEmail: string | undefined;
}

// For Email
interface IEmailConfig {
  [key: string]: IStripeConfig;
}

// For config
export interface IConfig {
  isLocal: boolean;
  host: string | undefined;
  privateKey: string | undefined;
  certificate: string | undefined;
  ca_bundle: string | undefined;
  env: string | undefined;
  SGMAIL: string | undefined;
  serverENV: string | undefined;
  sandboxServer: boolean;
  staging: boolean;

  server: IServerConfig;

  db: {
    authenticate: boolean;
    username: string | undefined;
    password: string | undefined;
  };

  dbHost: string | undefined;
  dbPort: string | number | undefined;
  debug: boolean;
  dbName: string | undefined;

  emails: IEmailConfig;
}

export interface IOnboardingDetails {
  accountId: string;
  companyId?: {
    _id?: string;
    address?: object;
  };
}
