import mongoose, { Schema } from 'mongoose';
import { SETTINGS } from '../utils/models.contant.ts';

const SettingsSchema = new Schema(
  {
    hidePOSOption: {
      type: Boolean,
      default: true
    },
    hideReaderOption: {
      type: Boolean,
      default: true
    },
    hideIntegration: {
      type: Boolean,
      default: true
    },
    isNewUI: {
      type: Boolean,
      default: true
    },
    underMaintenance: {
      type: Boolean,
      default: true
    },
    maintenanceUpTO: {
      type: String,
      default: '4'
    },
    deploymentEmailRecipients: [{ email: String, name: String }],
    isShowPerks: {
      type: Boolean,
      default: true,
      require: true
    },
    isShowAllPerks: {
      type: Boolean,
      default: true,
      require: true
    },
    domainChargeInUSD: String,
    domainChargeInCAD: String
  },
  { versionKey: false, timestamps: true }
);

const SettingsModel = mongoose.model(SETTINGS, SettingsSchema, SETTINGS);

export { SettingsModel };
