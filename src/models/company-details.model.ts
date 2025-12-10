import mongoose, { Schema } from 'mongoose';
import {
  COMPANY_DETAIL,
  COMPANY_PLANS,
  LOGIN,
  PAID_WEB,
  PARTNER
} from '../utils/models.contant.ts';
import { STATUS, SUBSCRIPTION_STATUS } from '../utils/constants.ts';

const CompanyDetailsSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: LOGIN
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: PARTNER
    },
    name: String,
    userIp: String,
    businessUrl: String,
    companyLogo: String,
    invoiceStartDate: String,
    subscriptionEndDate: String,
    invoiceEndDate: String,
    frequency: String,
    skipCompanyLogo: {
      type: Boolean,
      default: false
    },
    planChangeCount: {
      type: Number,
      default: 0
    },
    lastPlanChangeDate: {
      type: Date
    },
    eligibleForPlanChange: {
      type: Boolean,
      default: true
    },
    planChangeLimitReached: {
      type: Boolean,
      default: false
    },
    paymentStatementDescriptor: String,
    subscriptionStatus: {
      type: String,
      enum: SUBSCRIPTION_STATUS,
      default: 'inActive'
    },
    displayId: Number,
    status: {
      type: String,
      enum: STATUS,
      default: 'NOT_VERIFIED'
    },
    lastStatus: {
      type: String
    },
    currentPlan: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_PLANS
    },
    selectedType: String,
    oldPlan: {
      plan: {
        type: Schema.Types.ObjectId,
        ref: COMPANY_PLANS
      },
      type: { type: String }
    },
    cancelledPlan: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_PLANS
    },
    address: {
      addressLine: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      postcode: String,
      country: String,
      civicNumber: String
    },
    location: {
      city: String,
      state: String,
      country: String
    },
    downgradReasons: [
      {
        downgradeBy: {
          type: Schema.Types.ObjectId,
          ref: LOGIN
        },
        reason: String,
        downgradePlanDate: { type: Date, default: Date.now }
      }
    ],
    phone: String,
    email: String,
    gateway: {
      activated: [Date],
      deactivated: [Date],
      active: {
        type: Boolean,
        default: false
      },
      by: {
        type: Schema.Types.ObjectId,
        ref: LOGIN
      },
      created: {
        type: Date,
        required: true,
        default: Date.now
      },
      lastUpdate: [
        {
          type: Date,
          required: true,
          default: Date.now
        }
      ]
    },
    lastUpdate: {
      type: Date,
      required: true,
      default: Date.now
    },
    created: {
      type: Date,
      required: true,
      default: Date.now
    },
    tourStatus: {
      payment: {
        type: Boolean,
        default: true
      },
      web: {
        type: Boolean,
        default: true
      }
    },
    trial: Object,
    utm: {
      utmSource: { type: String },
      utmMedium: { type: String },
      utmCampaign: { type: String }
    },
    isDeletedAccount: {
      type: Boolean,
      default: false
    },
    domain: {
      isDomain: { type: Boolean },
      domainPurchaseCount: { type: Number },
      sitesWithCustomDomainCount: { type: Number },
      domainChargeInCAD: { type: Number },
      domainChargeInUSD: { type: Number },
      domainsPurchased: [
        {
          subscriptionId: String,
          created: Number,
          endedAt: Number,
          isAssigned: { type: Boolean, default: false },
          assignedToSite: { type: Schema.Types.ObjectId, ref: PAID_WEB }
        }
      ],
      eligibleForFreeDomain: { type: Boolean, default: true },
      isDomainCancelled: { type: Boolean },
      domainCancelledAt: { type: Number }
    }
  },
  { timestamps: true, versionKey: false }
);

const CompanyDetailsModel = mongoose.model(
  COMPANY_DETAIL,
  CompanyDetailsSchema,
  COMPANY_DETAIL
);

export { CompanyDetailsModel, CompanyDetailsSchema };
