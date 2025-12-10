import { TFilter } from '../utils/interfaces.ts';
import { DisputeModel } from '../models/dispute.model.ts';

export const updateDisputeTransactionEmailSentStatus = ({
  filterObj
}: {
  filterObj: TFilter;
}) => {
  return DisputeModel.updateOne(filterObj, { isResponseMailSent: true });
};

export const getAllDisputeTransactions = ({ filter }: { filter: TFilter }) => {
  return DisputeModel.find(filter)
    .populate({
      path: 'customer',
      select: 'customerId email name metadata'
    })
    .sort({ created: -1 });
};
