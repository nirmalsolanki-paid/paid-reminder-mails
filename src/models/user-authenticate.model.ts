import mongoose, { Schema } from 'mongoose';
import { LOGIN } from '../utils/models.contant.ts';

// Define the Login schema
const LoginSchema = new Schema(
  {
    platform: String,
    externalId: String,
    socketId: String,
    token: String,
    referral: String,
    activated: {
      type: Date
    },
    userData: {
      type: Object
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
    ],
    shiptimeAccessToken: String,
    paidAccessToken: String,
    verificationToken: String,
    posRefreshToken: String,
    paidRefreshToken: String,
    changeToken: { type: Boolean, default: false },
    tokenExpiry: { type: Number },
    isDeletedAccount: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

const LoginModel = mongoose.model(LOGIN, LoginSchema, LOGIN);

export { LoginModel };
