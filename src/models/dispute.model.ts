import mongoose, { Schema } from 'mongoose';
import {
  COMPANY_DETAIL,
  STRIPE_CUSTOMERS,
  STRIPE_DISPUTE_TRANSACTIONS
} from '../utils/models.contant.ts';

const DisputeSchema = new Schema(
  {
    id: String,
    status: String,
    accountId: String,
    companyId: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    charge: String,
    disputeCurrency: String,
    currency: String,
    amount: String,
    dueBy: String,
    created: String,
    reason: String,
    metadata: Object,
    isChargeRefundable: Boolean,
    evidenceDetails: Object,
    paymentMethod: String,
    paymentMethodDetails: Object,
    customer: {
      type: Schema.Types.ObjectId,
      ref: STRIPE_CUSTOMERS
    },
    balanceTransaction: String,
    isResponseMailSent: {
      type: Boolean,
      default: false
    },
    isHidden: {
      type: Boolean,
      default: false
    },
    exchangeRate: Number,
    amountRefunded: Number,
    applicationFeeAmount: Number,
    balanceTransactionAmount: Number,
    chargeAmountRefunded: Number,
    disputeFee: Number,
    billingDetails: Object,
    chargeCurrency: String,
    evidenceCustomerEmail: String,
    chargeBalanceTransactionCurrency: String,
    calculatedStatementDescriptor: String,
    description: String,
    receiptEmail: String,
    refunded: { type: Boolean, default: false },
    disputed: { type: Boolean, default: false }
  },
  { versionKey: false, timestamps: true }
);

const DisputeModel = mongoose.model(
  STRIPE_DISPUTE_TRANSACTIONS,
  DisputeSchema,
  STRIPE_DISPUTE_TRANSACTIONS
);

export { DisputeModel };
