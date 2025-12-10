import { Config } from '../config.ts';

export const env = Config.env ?? 'development';
export const SGMAIL = Config.SGMAIL;

export const DB_SERVER =
  Config.env === Config.serverENV ? Config.serverENV : 'dev';

export const TRANSACTION_URL = `payments/all-transactions/disputes/dispute-info`;
export const TRANSACTION_URL_NEWUI = `payments/transactions?type=adjustment`;
export const LOCAL_SERVER = Config.sandboxServer
  ? 'sandbox'
  : Config.env === Config.serverENV
    ? Config.serverENV
    : 'dev';

export const SUBSCRIPTION_STATUS = ['inActive', 'active', 'canceled'];

export const STATUS = ['NOT_VERIFIED', 'INCOMPLETE', 'ACTIVE', 'INACTIVE'];

export const SUBSCRIPTION_TYPE = ['mo', 'yr'];
