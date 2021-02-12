"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SettingSchema = new _mongoose.Schema({
  logoURL: {
    public_id: {
      type: String
    },
    imageURL: {
      type: String
    }
  },
  socialMedia: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    google: {
      type: String
    },
    youtube: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  aboutInfo: {
    type: String
  },
  contactInfo: {
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  companyName: {
    type: String
  },
  companyPhone: {
    type: Number
  },
  companyEmail: {
    type: String
  },
  whatsapp: {
    phone: {
      type: Number
    },
    text: {
      type: String
    }
  }
}, {
  timestamps: true,
  collection: 'Settings'
});

var Settings = _mongoose["default"].model('Settings', SettingSchema);

var _default = Settings;
exports["default"] = _default;