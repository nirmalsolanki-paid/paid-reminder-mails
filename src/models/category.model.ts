import mongoose, { Schema } from 'mongoose';
import { CATEGORIES } from '../utils/models.contant.ts';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model(CATEGORIES, CategorySchema, CATEGORIES);

export { CategoryModel };
