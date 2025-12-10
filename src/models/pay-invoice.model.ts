import mongoose, { Schema } from 'mongoose';

import { COMPANY_DETAIL, PAY_INVOICE } from '../utils/models.contant.ts';

const PayInvoiceSchema = new Schema(
  {
    token: String,
    companyId: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    accountId: String,
    customerId: String,
    invoiceId: String,
    isInvoiceViewed: { type: Boolean, default: false },
    invoiceViewedAt: Date,
    subscriptionEndDate: String,
    subscriptionId: String,
    invoiceEndDate: String,
    frequency: String,
    invoiceStartDate: String,
    dueDate: Number,
    status: String,
    currency: String,
    amount_due: Number,
    number: String,
    isInvoiceEmailSendToMerchant: { type: Boolean, default: false },
    isInvoiceDeposited: { type: Boolean, default: false },
    invoiceDepositedAt: Date,
    created: { type: Date, required: true, default: Date.now },
    paidAt: Date,
    openAt: Date,
    paid: Boolean,
    draftedAt: Date,
    voidAt: Date,
    uncollectibleAt: Date,
    subCustomers: [
      {
        email: String,
        customer: String,
        name: String,
        token: String,
        paidAt: { type: Date, default: null },
        viewedAt: { type: Date, default: null },
        sendAt: { type: Date, default: null },
        subCustomerId: { type: String, default: null }
      }
    ],
    lastUpdate: { type: Date, required: true, default: Date.now },
    // new fields
    customerEmail: String,
    billingReason: String,
    collectionMethod: String,
    pushCommunicationId: String,
    railzInvoiceId: String,
    isPushedToRailz: Boolean,
    products: [],
    total: Number,
    subscriptionInterval: String,
    taxes: [],
    serviceFees: [],
    status_transitions: Object,
    metadata: Object,
    description: String,
    customerAddress: Object,
    customerPhone: String,
    customerName: String,
    accountCountry: String,
    invoicePdf: String,
    subtotal: Number,
    notExistsInStripe: Boolean,
    railzError: Array,
    isSubscriptionScheduled: { type: Boolean, default: false },
    isInvoiceEmailSent: Boolean,
    scheduleStartDate: String
  },
  { versionKey: false, timestamps: true }
);

const PayInvoiceModel = mongoose.model(
  PAY_INVOICE,
  PayInvoiceSchema,
  PAY_INVOICE
);

export { PayInvoiceModel, PayInvoiceSchema };
