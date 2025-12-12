import moment from 'moment';
import { sendInvoiceMail } from '../mail/send-invoice-mail.ts';
import {
  getAllPayInvoiceByDueDate,
  getPayInvoiceByInvoiceId
} from '../dao/pay-invoice.dao.ts';
import { getStripeOnboardingDetailsByAccountId } from '../dao/stripe-onboarding-account.dao.ts';

export const sendInvoiceEmail = async (): Promise<void> => {
  const before3Days = moment().utc().add(3, 'days').startOf('day').unix();
  const after3Days = moment().utc().subtract(3, 'days').startOf('day').unix();
  const onDueDate = moment().utc().startOf('day').unix();

  await Promise.all([
    sendInvoices(before3Days, 'before3Days'),
    sendInvoices(after3Days, 'after3Days'),
    sendInvoices(onDueDate, 'onDueDate')
  ]);
};

const sendInvoices = async (
  date: number,
  type: 'before3Days' | 'onDueDate' | 'after3Days'
): Promise<void> => {
  const invoices = await getAllPayInvoiceByDueDate({ date });
  if (!invoices?.length) return;

  await Promise.all(
    invoices.map(async (invoice) => {
      const { invoiceById, stripeOnboardingAccount } =
        await getInvoiceAndOnboardingDetails(
          invoice?.invoiceId as string,
          invoice?.accountId as string
        );

      if (
        invoiceById &&
        invoice?.companyId &&
        stripeOnboardingAccount?.accountSettings?.emailReminder?.[type]
      ) {
        await sendInvoiceMail({
          companyId: invoice.companyId.toString(),
          invoice: invoiceById,
          token: invoice?.token as string,
          number: invoice?.number as string,
          reminder: true
        });
      }
    })
  );
};

const getInvoiceAndOnboardingDetails = async (
  invoiceId: string,
  accountId: string
) => {
  const [invoiceById, stripeOnboardingAccount] = await Promise.all([
    getPayInvoiceByInvoiceId({ invoiceId }),
    getStripeOnboardingDetailsByAccountId({ accountId })
  ]);

  return { invoiceById, stripeOnboardingAccount };
};
