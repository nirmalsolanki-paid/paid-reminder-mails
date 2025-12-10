import { Response } from 'express';

const httpResponse = {
  error: ({
    res,
    message = 'error',
    statusCode = 500,
    other = {}
  }: {
    res?: Response;
    message?: string;
    statusCode?: number;
    other?: object;
  }) => {
    return res?.status(statusCode).send({
      status: 'failed',
      message,
      ...other
    });
  }
};

export default httpResponse;
