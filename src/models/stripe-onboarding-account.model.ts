import mongoose, { Schema } from 'mongoose';
import { COMPANY_DETAIL, STRIPE_ONBOARDING } from '../utils/models.contant.ts';

const StripeOnboardingSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: COMPANY_DETAIL
  },
  accountId: String,
  chargesEnabled: Boolean,
  payoutsEnabled: Boolean,
  disabledReason: Boolean,
  stripeOnboarding: Boolean,
  account: Object,
  accountSettings: {
    defaultTaxRates: Array,
    generalSettings: {
      defaultCurrency: String,
      defaultTerms: String
    },
    paymentSettings: {
      card: { type: Boolean, default: true },
      bank: { type: Boolean, default: true }
    },
    merchantSetting: {
      merchantSecret: String
    },
    emailCustomization: {
      invoiceSubject: String,
      invoiceMessage: String,
      receiptSubject: String,
      receiptMessage: String
    },
    emailNotification: {
      invoiceViewed: { type: Boolean, default: true },
      invoicePaid: { type: Boolean, default: true },
      receivingPayout: { type: Boolean, default: false },
      reportDownload: { type: Boolean, default: true },
      transactionRefunded: { type: Boolean, default: true },
      payingCheckout: { type: Boolean, default: true }
    },
    emailReminder: {
      before3Days: { type: Boolean, default: true },
      onDueDate: { type: Boolean, default: true },
      after3Days: { type: Boolean, default: false }
    },
    emailSummary: {
      daily: { type: Boolean, default: true },
      weekly: { type: Boolean, default: true },
      monthly: { type: Boolean, default: true }
    }
  },
  isVerified: { type: Boolean, default: false },
  accountStatus: {
    type: String,
    enum: ['restricted', 'restricted_soon', 'active'],
    default: 'active'
  },
  isBankAccountAdded: { type: Boolean, default: false },
  onBoardingUrl: String,
  expiresAt: { type: Date },
  created: { type: Date, required: true, default: Date.now },
  lastUpdate: { type: Date, required: true, default: Date.now }
});

const StripeOnboardingModel = mongoose.model(
  STRIPE_ONBOARDING,
  StripeOnboardingSchema,
  STRIPE_ONBOARDING
);

export { StripeOnboardingModel };
