import mongoose, { Schema } from 'mongoose';
import {
  COMPANY_DETAIL,
  COMPANY_PLANS,
  PARTNER,
  PLAN
} from '../utils/models.contant.ts';
import { SUBSCRIPTION_TYPE } from '../utils/constants.ts';

const CompanyPlansSchema = new Schema(
  {
    subscriptions: [
      {
        type: {
          type: String,
          enum: SUBSCRIPTION_TYPE,
          default: 'mo'
        },
        priceInCAD: Number,
        priceInUSD: Number,
        stripePlanIdCAD: String,
        stripePlanIdUSD: String
      }
    ],

    plan: {
      type: Schema.Types.ObjectId,
      ref: PLAN,
      required: true
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: PARTNER
    },
    shippingDiscount: Number,
    shippingRate: String,
    trialDays: { type: String, default: '0' },
    support: Array,
    deleted: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    collectPaymentPercent: { type: Number },
    collectPaymentAmount: { type: Number },
    intCollectPaymentPercent: { type: Number },
    intCollectPaymentAmount: { type: Number },
    includesWebsiteUpTo: { type: Number },
    created: { type: Date, required: true, default: Date.now },
    lastUpdate: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

const CompanyPlansModel = mongoose.model(
  COMPANY_PLANS,
  CompanyPlansSchema,
  COMPANY_PLANS
);

export { CompanyPlansModel, CompanyPlansSchema };
