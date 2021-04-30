import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema(
  {
    logoURL: {
      public_id: {
        type: String,
      },
      imageURL: {
        type: String,
      },
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
      google: {
        type: String,
      },
      youtube: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    aboutInfo: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyPhone: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    whatsapp: {
      phone: {
        type: Number,
      },
      text: {
        type: String,
      },
    },
    companyImg: {
      public_id: {
        type: String,
      },
      imageURL: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    collection: "Settings",
  }
);

const Settings = mongoose.model("Settings", SettingSchema);

export default Settings;
