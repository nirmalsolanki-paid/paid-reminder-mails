import { StripeOnboardingModel } from '../models/stripe-onboarding-account.model.ts';

export const getStripeOnboardingDetailsByAccountId = async ({
  accountId
}: {
  accountId: string;
}) => {
  return StripeOnboardingModel.findOne({ accountId });
};

export const getStripeOnboardingDetailsByCompanyId = ({
  companyId
}: {
  companyId: string;
}) => {
  return StripeOnboardingModel.findOne({ companyId }).populate('companyId');
};
