import mongoose, { Schema } from 'mongoose';
import { COMPANY_DETAIL, LOGIN, PARTNER } from '../utils/models.contant.ts';

const PartnerSchema = new Schema(
  {
    name: String,
    intercept: Boolean,
    mainPlan: Boolean,
    url: String,
    partnerLogo: String,
    status: {
      type: Boolean,
      default: true
    },
    paymentMethod: {
      type: String,
      default: 'stripe'
    },
    cartType: {
      type: String,
      default: 'ecwid'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: LOGIN
    },
    partnerCompany: {
      type: Schema.Types.ObjectId,
      ref: COMPANY_DETAIL
    },
    productsAvailable: Array,
    created: {
      type: Date,
      required: true,
      default: Date.now
    },
    lastUpdate: {
      type: Date,
      required: true,
      default: Date.now
    },
    hidePartner: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true }, versionKey: false, timestamps: true }
);

const PartnerModel = mongoose.model(PARTNER, PartnerSchema, PARTNER);

export { PartnerModel, PartnerSchema };
