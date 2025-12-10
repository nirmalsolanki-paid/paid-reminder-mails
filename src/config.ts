import dotenv from 'dotenv';
import { IConfig } from './utils/interfaces.ts';

dotenv.config();

const isLocal = false;
export const Config: IConfig = {
  isLocal,
  host: '::',
  privateKey: process.env.PRIVATE_KEY,
  certificate: process.env.CERTIFICATE,
  ca_bundle: process.env.CA_BUNDLE,
  env: process.env.SERVER_ENV, // For development env set 'development', production env set 'production' and for staging env set 'staging'
  serverENV: process.env.SERVER,
  sandboxServer: process.env.IS_SANDBOX_SERVER === 'true',
  SGMAIL: process.env.SGMAIL,
  staging: process.env.STAGING === 'true',

  server: {
    development: {
      port: isLocal ? process.env.LOCAL_PORT : process.env.DEV_PORT
    },
    staging: {
      port: process.env.STAGING_PORT
    },
    production: {
      port: process.env.PROD_PORT
    }
  },

  db: {
    authenticate: process.env.DB_AUTHENTICATE === 'true',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },

  dbHost: isLocal ? process.env.LOCAL_DB_HOST : process.env.DB_HOST,
  dbPort: isLocal ? process.env.LOCAL_DB_PORT : process.env.DB_PORT,
  debug: process.env.DEBUG === 'true',
  dbName: process.env.DB_NAME,
  emails: {
    development: {
      supportReceiverEmail: process.env.DEV_EMAIL,
      supportEmail: process.env.PROD_SUPPORT_EMAIL,
      feedbackEmail: process.env.PROD_FEEDBACK_EMAIL,
      paymentsEmail: process.env.PROD_PAYMENTS_EMAIL
    },
    staging: {
      supportReceiverEmail: process.env.DEV_EMAIL,
      supportEmail: process.env.PROD_SUPPORT_EMAIL,
      feedbackEmail: process.env.PROD_FEEDBACK_EMAIL,
      paymentsEmail: process.env.PROD_PAYMENTS_EMAIL
    },
    production: {
      supportReceiverEmail: process.env.PROD_SUPPORT_EMAIL,
      supportEmail: process.env.PROD_SUPPORT_EMAIL,
      feedbackEmail: process.env.PROD_FEEDBACK_EMAIL,
      paymentsEmail: process.env.PROD_PAYMENTS_EMAIL
    }
  }
};
