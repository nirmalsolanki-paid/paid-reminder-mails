import { IConfig } from './utils/interfaces.ts';
import { GoogleSecretManagerService } from './secret-manager/google-secret-manager.service.ts';

const isLocal = false;

// Set your Google Cloud project ID here (update as needed)
const projectId = 'payrix-210418';

async function getEnvPrefixFromSecretManager(
  projectId: string
): Promise<Record<string, string>> {
  const secretManager = new GoogleSecretManagerService(projectId);
  const rawEnv = await secretManager.getSecret('ENV_REMINDER_MAILS');

  // Remove comment and empty lines
  const cleanedEnv = rawEnv.split('\n').filter((line) => {
    const trimmed = line.trim();

    return trimmed && !trimmed.startsWith('#');
  });

  // Convert to object
  const envObject: Record<string, string> = {};
  for (const line of cleanedEnv) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envObject[key.trim()] = valueParts.join('=').trim();
    }
  }

  return envObject;
}

export async function createConfig(): Promise<IConfig> {
  const envPrefix = await getEnvPrefixFromSecretManager(projectId);

  const config: IConfig = {
    isLocal,
    host: '::',
    privateKey: envPrefix.PRIVATE_KEY,
    certificate: envPrefix.CERTIFICATE,
    ca_bundle: envPrefix.CA_BUNDLE,
    env: envPrefix.SERVER_ENV, // For development env set 'development', production env set 'production' and for staging env set 'staging'
    serverENV: envPrefix.SERVER,
    sandboxServer: envPrefix.IS_SANDBOX_SERVER === 'true',
    SGMAIL: envPrefix.SGMAIL,
    staging: envPrefix.STAGING === 'true',

    server: {
      development: {
        port: isLocal ? envPrefix.LOCAL_PORT : envPrefix.DEV_PORT
      },
      staging: {
        port: envPrefix.STAGING_PORT
      },
      production: {
        port: process.env.PROD_PORT
      }
    },

    db: {
      authenticate: envPrefix.DB_AUTHENTICATE === 'true',
      username: envPrefix.DB_USERNAME,
      password: envPrefix.DB_PASSWORD
    },

    dbHost: isLocal ? envPrefix.LOCAL_DB_HOST : envPrefix.DB_HOST,
    dbPort: isLocal ? envPrefix.LOCAL_DB_PORT : envPrefix.DB_PORT,
    debug: envPrefix.DEBUG === 'true',
    dbName: envPrefix.DB_NAME,
    emails: {
      development: {
        paymentsEmail: envPrefix.PROD_PAYMENTS_EMAIL
      },
      staging: {
        paymentsEmail: envPrefix.PROD_PAYMENTS_EMAIL
      },
      production: {
        paymentsEmail: process.env.PROD_PAYMENTS_EMAIL
      }
    }
  };

  return config;
}

export const Config = await createConfig();
