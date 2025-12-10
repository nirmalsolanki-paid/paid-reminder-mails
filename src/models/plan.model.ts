import mongoose, { Schema } from 'mongoose';
import { PLAN } from '../utils/models.contant.ts';

const PlanSchema = new Schema(
  {
    name: String,
    enDescription: String,
    frDescription: String,
    cart: [],
    payments: [],
    shipping: [],
    web: [],
    payroll: [],
    created: { type: Date, required: true, default: Date.now },
    lastUpdate: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

const PlanModel = mongoose.model(PLAN, PlanSchema, PLAN);

export { PlanSchema, PlanModel };
