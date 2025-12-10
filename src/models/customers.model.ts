import mongoose, { Schema } from 'mongoose';
import {
  CATEGORIES,
  COMPANY_DETAIL,
  STRIPE_CUSTOMERS
} from '../utils/models.contant.ts';

const StripeCustomerSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    customerId: String,
    accountId: String,
    paymentMethod: {
      id: String,
      brand: String,
      expMonth: Number,
      expYear: String,
      last4: String
    },
    name: String,
    displayName: {
      type: String
    },
    notes: String,
    email: String,
    sameAsBillingAddress: {
      type: Boolean,
      default: true
    },
    phone: String,
    address: Object,
    metadata: Object,
    shipping: Object,
    created: String,
    pushCommunicationId: String,
    pendingRailzInvoicePush: Boolean,
    railzCustomerId: String,
    xeroCustomerId: String,
    quickbooksCustomerId: String,
    railzPushFailed: Boolean,
    isPushedToRailz: {
      type: Boolean,
      default: false
    },
    lastUpdate: { type: Date, required: true, default: Date.now },
    lastTransactionAt: {
      type: Number
    },
    recentTransactionAt: {
      type: Number
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CATEGORIES
    },
    railzError: Array
  },
  { versionKey: false, timestamps: true }
);

const StripeCustomerModel = mongoose.model(
  STRIPE_CUSTOMERS,
  StripeCustomerSchema,
  STRIPE_CUSTOMERS
);

export { StripeCustomerModel };
