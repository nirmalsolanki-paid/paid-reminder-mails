import { StripeCustomerModel } from '../models/customers.model.ts';

export const getOneCustomerById = ({ customerId }: { customerId: string }) => {
  return StripeCustomerModel.findOne({ customerId });
};
