import mongoose, { Schema } from 'mongoose';
import { COMPANY_DETAIL, LOGIN, PAID_WEB } from '../utils/models.contant.ts';

const PaidWebSchema = new Schema(
  {
    site_name: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    planUpdatedToDuda: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    published: {
      type: String,
      default: 'NOT_PUBLISHED_YET'
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    site_display_name: {
      type: String,
      required: false
    },
    site_default_domain: {
      type: String
    },
    loginId: {
      type: Schema.Types.ObjectId,
      ref: LOGIN
    },
    type: {
      type: String,
      enum: ['AI', 'TEMPLATE']
    },
    createdWithAI: Boolean,
    site_domain: { type: String },
    domain: {
      siteHasDomain: { type: Boolean, default: false },
      domainSubscriptionId: { type: String }
    },
    created: { type: Date, required: true, default: Date.now },
    lastUpdate: { type: Date, required: true, default: Date.now }
  },
  { versionKey: false }
);

const PaidWebModel = mongoose.model(PAID_WEB, PaidWebSchema, PAID_WEB);

export { PaidWebModel };
