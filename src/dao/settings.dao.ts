import { SettingsModel } from '../models/settings.model.ts';

export const getAdminSettings = async () => {
  return SettingsModel.findOne({});
};

export const updateSettings = async ({ update }: { update: object }) => {
  return SettingsModel.findOneAndUpdate({}, update, {
    new: true,
    upsert: true
  });
};
