import { Schema, model } from "mongoose";

const SettingSchema = new Schema(
  {
    logoURL: {
      public_id: {
        type: String,
        default: "",
      },
      imageURL: {
        type: String,
        default: "",
      },
    },
    socialMedia: {
      facebook: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      google: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
    },
    aboutInfo: {
      type: String,
      default: "",
    },
    companyName: {
      type: String,
      default: "",
    },
    companyPhone: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyAddress: {
      type: String,
      default: "",
    },
    whatsapp: {
      phone: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    companyImg: {
      public_id: {
        type: String,
        default: "",
      },
      imageURL: {
        type: String,
        default: "",
      },
    },
    companyURL: {
      type: String,
      default: "",
    },
    sliderOverlayLevel: {
      type: Number,
      default: 1,
    },
    videobackground: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    isBackgroundVideoActivated: {
      type: Boolean,
      default: false,
    },
    backgroundVideoImage: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    primaryColor: {
      type: String,
      default: "#ff0000",
    },
    secondaryColor: {
      type: String,
      default: "#ff0000",
    },
    fontFamily: {
      type: String,
      default: "Montserrat",
    },
  },
  {
    timestamps: true,
    collection: "Settings",
  }
);

module.exports = model("Settings", SettingSchema);
