import mongoose from 'mongoose';
import { CompanyDetailsModel } from '../models/company-details.model.ts';

export const getCompanyDetailById = ({ _id }: { _id: string }) => {
  return CompanyDetailsModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })
    .populate({ path: 'currentPlan', populate: { path: 'plan' } })
    .populate({ path: 'oldPlan.plan', populate: { path: 'plan' } })
    .populate({ path: 'cancelledPlan', populate: { path: 'plan' } })
    .populate('partner')
    .select({ __v: 0 });
};
