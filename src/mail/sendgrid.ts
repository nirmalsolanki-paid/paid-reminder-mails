import { getErrorMessage } from '../utils/common-functions.ts';
import { SGMAIL } from '../utils/constants.ts';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(SGMAIL as string);

export const sendEmail = (msg: MailDataRequired | MailDataRequired[]) => {
  try {
    sgMail.send(msg).catch(async (error) => {
      console.log('Error: ', error);

      return {
        status: 'failed',
        message: getErrorMessage(error)
      };
    });
  } catch (error) {
    return {
      status: 'failed',
      message: getErrorMessage(error)
    };
  }
};
