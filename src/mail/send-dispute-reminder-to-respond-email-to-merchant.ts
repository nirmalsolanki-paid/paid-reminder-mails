import { Config } from '../config.ts';
import { getAdminSettings } from '../dao/settings.dao.ts';
import { getStripeOnboardingDetailsByAccountId } from '../dao/stripe-onboarding-account.dao.ts';
import { getErrorMessage } from '../utils/common-functions.ts';

import {
  env,
  LOCAL_SERVER,
  TRANSACTION_URL,
  TRANSACTION_URL_NEWUI
} from '../utils/constants.ts';

import { sendEmail } from './sendgrid.ts';

const cleanText = (text = '') =>
  text.replace(/[\u202A-\u202E\u2066-\u2069]/g, '');

export const sendDisputeRemainderToRespondEmail = async ({
  accountId,
  transactionDate,
  dueDate,
  disputeId
}: {
  accountId: string;
  transactionDate: string;
  dueDate: string;
  disputeId: string;
}) => {
  try {
    const adminSettings = await getAdminSettings();

    const domain = `https://${Config.debug ? LOCAL_SERVER : 'app'}.paid.com`;

    const transactionUrl = adminSettings?.isNewUI
      ? TRANSACTION_URL_NEWUI
      : `${TRANSACTION_URL}/${disputeId}`;
    const stripeOnboardingAccount = await getStripeOnboardingDetailsByAccountId(
      { accountId }
    );

    const toEmail =
      stripeOnboardingAccount &&
      typeof stripeOnboardingAccount !== 'string' &&
      stripeOnboardingAccount.account?.business_profile?.support_email
        ? stripeOnboardingAccount.account.business_profile.support_email
        : '';

    const fromEmail = Config?.emails[env]?.paymentsEmail || 'no-reply@paid.com';

    const merchantName =
      stripeOnboardingAccount &&
      typeof stripeOnboardingAccount !== 'string' &&
      stripeOnboardingAccount?.account?.business_profile?.name
        ? cleanText(stripeOnboardingAccount.account.business_profile.name)
        : '';

    const msg = {
      to: toEmail,
      from: {
        email: fromEmail,
        name: 'PaidPayments'
      },
      sender: 'PaidPayments',
      templateId: 'd-b61b65fa84b5471389b1891a6cec8334',
      dynamic_template_data: {
        merchantName,
        transactionDate,
        dueDate,
        view_transaction: `${domain}/${transactionUrl}`,
        subject: `Reminder To Respond For Dispute Transaction ${transactionDate}`
      }
    };
    sendEmail(msg);
  } catch (error) {
    return {
      status: 'failed',
      message: getErrorMessage(error)
    };
  }
};
