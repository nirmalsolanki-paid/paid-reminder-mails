import { Config } from '../config.ts';
import { LOCAL_SERVER } from './constants.ts';

export const urlGenerater = ({ origin }: { origin?: string }) => {
  return origin
    ? origin
    : `https://${Config.debug ? LOCAL_SERVER : 'app'}.paid.com`;
};

export const getCurrency = ({ currency }: { currency: string }) => {
  switch (currency?.toLowerCase()) {
    case 'eur':
      return '€';
    case 'usd':
    case 'cad':
    default:
      return '$';
  }
};

export const getErrorMessage = (error?: Error | unknown) => {
  if (error instanceof Error) {
    return `${error}`;
  }

  return error;
};
