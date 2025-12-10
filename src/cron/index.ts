import { Router, Request, Response } from 'express';
import { sendInvoiceEmail } from './send-invoice-email.ts';
import { sendDisputeReminderEmails } from './dispute-reminder-email.ts';

const ReminderMailRouting = Router();

// Healthcheck
ReminderMailRouting.get('/', (_req: Request, res: Response) => {
  res.send('Cron service is running ✅');
});

// Send invoice reminder emails
ReminderMailRouting.post(
  '/send-invoice-emails',
  async (_req: Request, res: Response) => {
    await sendInvoiceEmail();
    res.status(200).send('Invoice reminder emails sent ✅');
  }
);

// Send dispute reminder emails
ReminderMailRouting.post(
  '/dispute-reminders',
  async (_req: Request, res: Response) => {
    await sendDisputeReminderEmails();
    res.status(200).send('Dispute reminder emails sent ✅');
  }
);

export default ReminderMailRouting;
