import { InferSchemaType } from 'mongoose';
import { PayInvoiceModel } from '../models/pay-invoice.model.ts';

type PayInvoiceType = InferSchemaType<typeof PayInvoiceModel.schema>;

export const getPayInvoiceByInvoiceId = ({
  invoiceId
}: {
  invoiceId: string;
}) => {
  return PayInvoiceModel.findOne({ invoiceId }).sort({ created: -1 });
};

export const getAllPayInvoiceByDueDate = async ({ date }: { date: number }) => {
  const cursor = PayInvoiceModel.find({ dueDate: date }).cursor({
    batchSize: 100
  });

  const results: PayInvoiceType[] = [];

  for await (const doc of cursor) {
    results.push(doc.toObject() as PayInvoiceType);
  }

  return results;
};
