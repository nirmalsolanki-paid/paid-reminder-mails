import moment from 'moment';
import {
  getAllDisputeTransactions,
  updateDisputeTransactionEmailSentStatus
} from '../dao/dispute.dao.ts';
import { sendDisputeRemainderToRespondEmail } from '../mail/send-dispute-reminder-to-respond-email-to-merchant.ts';

export const sendDisputeReminderEmails = async (): Promise<void> => {
  const allDisputes = await getAllDisputeTransactions({
    filter: {
      isResponseMailSent: false,
      $or: [{ status: 'needs_response' }, { status: 'warning_needs_response' }]
    }
  });

  for (const dispute of allDisputes) {
    const { id, created, dueBy, accountId } = dispute;
    const transactionDate = moment
      .unix(Number(created))
      .utc()
      .format('MMMM DD, YYYY');
    const dueDateFormated = moment
      .unix(Number(dueBy))
      .utc()
      .format('MMMM DD, YYYY, hh:mm:ss A');

    const dueDate = moment.unix(Number(dueBy));

    const dateDiffrence = moment().diff(dueDate, 'days');

    // Send reminder if due date is within 2 days before due
    if (dateDiffrence >= -2 && dateDiffrence <= 0) {
      await sendDisputeRemainderToRespondEmail({
        accountId: accountId as string,
        transactionDate,
        dueDate: dueDateFormated,
        disputeId: id as string
      });

      await updateDisputeTransactionEmailSentStatus({
        filterObj: { id }
      });
    }
  }
};
