import moment from 'moment';
import { sendInvoiceMail } from '../mail/send-invoice-mail.ts';
import {
  getAllPayInvoiceByDueDate,
  getPayInvoiceByInvoiceId
} from '../dao/pay-invoice.dao.ts';
import { getStripeOnboardingDetailsByAccountId } from '../dao/stripe-onboarding-account.dao.ts';

export const sendInvoiceEmail = async (): Promise<void> => {
  const before3Days = moment().add(3, 'days').startOf('day').unix();
  const after3Days = moment().subtract(3, 'days').startOf('day').unix();
  const onDueDate = moment().startOf('day').unix();

  await sendInvoices(before3Days, 'before3Days');
  await sendInvoices(after3Days, 'after3Days');
  await sendInvoices(onDueDate, 'onDueDate');
};

const sendInvoices = async (
  date: number,
  type: 'before3Days' | 'onDueDate' | 'after3Days'
): Promise<void> => {
  const invoices = await getAllPayInvoiceByDueDate({ date });
  if (!invoices?.length) return;

  for (const invoice of invoices) {
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
  }
};

const getInvoiceAndOnboardingDetails = async (
  invoiceId: string,
  accountId: string
) => {
  const invoiceById = await getPayInvoiceByInvoiceId({ invoiceId });
  const stripeOnboardingAccount = await getStripeOnboardingDetailsByAccountId({
    accountId
  });

  return { invoiceById, stripeOnboardingAccount };
};
