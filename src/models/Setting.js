import { Schema, model } from "mongoose";

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
        type: String,
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
    companyURL: {
      type: String,
    },
    sliderOverlayLevel: {
      type: Number,
      default: 6,
    },
    videobackground: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isBackgroundVideoActivated: {
      type: Boolean,
      default: false,
    },
    backgroundVideoImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    primaryColor: {
      type: String,
    },
    secondaryColor: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Settings",
  }
);

module.exports = model("Settings", SettingSchema);
