import moment from 'moment';
import { Config } from '../config.ts';
import { sendEmail } from './sendgrid.ts';
import { env } from '../utils/constants.ts';
import { getOneCustomerById } from '../dao/customers.dao.ts';
import { getCurrency, urlGenerater } from '../utils/common-functions.ts';
import { getStripeOnboardingDetailsByCompanyId } from '../dao/stripe-onboarding-account.dao.ts';
import { getCompanyDetailById } from '../dao/company-details.dao.ts';
import { AccountSettings, InvoiceData } from './sendgrid.interface.ts';

const cleanText = (text = '') =>
  text.replace(/[\u202A-\u202E\u2066-\u2069]/g, '');

export const sendInvoiceMail = async ({
  companyId,
  invoice,
  token,
  reminder,
  emailSubject,
  emailBody,
  email,
  origin,
  number
}: {
  companyId: string;
  invoice: object;
  token: string;
  reminder?: boolean;
  emailSubject?: string;
  emailBody?: string;
  email?: string;
  number: string;
  origin?: string;
}) => {
  const clonedInvoice = JSON.parse(JSON.stringify(invoice));
  let customerById;
  if (clonedInvoice?.customerId) {
    customerById = await getOneCustomerById({
      customerId: clonedInvoice.customerId
    });
  }

  const toEmail =
    email ||
    clonedInvoice?.latest_invoice?.customer_email ||
    clonedInvoice?.customer_email ||
    customerById?.email;

  const fromEmail = Config.emails[env].paymentsEmail || 'no-reply@paid.com';

  const msg = {
    to: toEmail,
    from: {
      email: fromEmail,
      name: 'PaidPayments'
    },
    sender: 'PaidPayments',
    templateId: 'd-2196bf8f5b144d4c889534673aea1028',
    dynamic_template_data: await fetDynamicTemplateDataForInvoice({
      companyId,
      invoice: clonedInvoice,
      token,
      reminder: reminder || false,
      emailSubject: emailSubject || '',
      emailBody: emailBody || '',
      origin: origin || '',
      number: number || ''
    })
  };

  sendEmail(msg);
};

const fetDynamicTemplateDataForInvoice = async ({
  companyId,
  invoice,
  token,
  reminder,
  emailSubject,
  emailBody,
  origin,
  number
}: {
  companyId: string;
  invoice: InvoiceData;
  token: string;
  reminder: boolean;
  emailSubject: string;
  emailBody: string;
  origin: string;
  number: string;
}) => {
  const [CompanyDetails, stripeDetails] = await Promise.all([
    getCompanyDetailById({ _id: companyId }),
    getStripeOnboardingDetailsByCompanyId({ companyId })
  ]);

  const isSubscription =
    invoice.billing_reason?.includes('subscription') ||
    !!invoice?.billing_reason ||
    false;
  const currency = invoice?.currency || 'usd';
  const currencySign = getCurrency({ currency });
  const companyLogo = (CompanyDetails && CompanyDetails.companyLogo) || '';
  let due_date = null;
  const isPaid =
    invoice?.collection_method?.toLowerCase() === 'charge_automatically' ||
    invoice?.status?.toLowerCase() === 'paid';

  if (isPaid) {
    const paidTimestamp =
      invoice.dueDate ||
      invoice.due_date ||
      invoice.latest_invoice?.created ||
      invoice.created;
    const paidDate = moment.unix(paidTimestamp).utc().format('MMMM DD, YYYY');

    due_date = `Paid on ${paidDate}`;
  } else {
    const dueDateTs =
      invoice.dueDate || invoice.latest_invoice?.due_date || invoice.due_date;

    due_date = `Due on ${moment.unix(dueDateTs).utc().format('MMMM DD, YYYY')}`;
  }

  const defaultCustomerMessage = (
    stripeDetails?.accountSettings as AccountSettings
  )?.invoiceCustomization?.defaultCustomerMessage;
  const defaultSubject = (stripeDetails?.accountSettings as AccountSettings)
    ?.invoiceCustomization?.defaultSubject;

  let subject;
  const companyName = cleanText(CompanyDetails?.name || 'Paid, Inc');

  if (emailSubject) {
    subject = cleanText(emailSubject);
  } else if (isSubscription) {
    subject = `${
      reminder ? '[Reminder]' : ''
    } Invoice for Subscription from ${companyName}`;
  } else if (defaultSubject) {
    subject = `${reminder ? '[Reminder]' : ''} ${cleanText(defaultSubject)}`;
  } else {
    subject = `${reminder ? '[Reminder]' : ''} Invoice from ${companyName}`;
  }

  const invoiceNumber =
    number || invoice?.number || invoice?.latest_invoice?.number;

  const domain = urlGenerater({ origin });

  return {
    due_date,
    companyLogo,
    currency: currency.toUpperCase(),
    price: `${currencySign}${(
      (invoice?.total ||
        invoice?.latest_invoice?.amount_due ||
        invoice?.amount_due) / 100
    ).toFixed(2)} ${currency.toUpperCase()}`,
    number: invoiceNumber,
    title: isSubscription
      ? `Invoice for Subscription from ${companyName}`
      : `Invoice from ${companyName}`,
    subject,
    customMessage:
      emailBody ||
      defaultCustomerMessage ||
      `Here's your invoice! We appreciate your prompt payment.`,
    companyName,
    button_text: isPaid ? 'Review Invoice' : 'Pay and Review',
    pay_now: `${domain}/pay-invoice/${token}`
  };
};
