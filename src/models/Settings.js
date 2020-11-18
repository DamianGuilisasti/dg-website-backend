import mongoose, { Schema } from 'mongoose';

const SettingSchema = new Schema({
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
        type: String,
        maxlength: 64
    },
    companyPhone: {
        type: Number,
        maxlength: 64
    },
    companyEmail: {
        type: String,
        maxlength: 64
    },
    whatsapp: {
        phone: {
            type: Number
        },
        text: {
            type: String
        }
    }
},
    {
        timestamps: true,
        collection: 'Settings'
    });

const Settings = mongoose.model('Settings', SettingSchema)

export default Settings;