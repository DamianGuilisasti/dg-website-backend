import Settings from '../models/Settings';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export default {
    addSettings: async (req, res, next) => {
        try {
            const { aboutInfo, companyName, socialMedia, contactInfo, logoURL, companyPhone, whatsapp, companyEmail } = req.body;
            const newConfiguration = new Settings({
                aboutInfo, companyName, socialMedia, contactInfo, logoURL, companyPhone, whatsapp, companyEmail
            })

            const newConfigurationSaved = await newConfiguration.save();
            res.status(200).json(newConfigurationSaved);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    listSettings: async (req, res, next) => {
        try {
            const settings = await Settings.find();
            res.status(200).json(settings);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    updateInfo: async (req, res, next) => {
        try {
            const reg = await Settings.findByIdAndUpdate(
                { _id: req.body._id },
                {
                    aboutInfo: req.body.aboutInfo,
                    companyName: req.body.companyName,
                    companyPhone: req.body.companyPhone,
                    companyEmail: req.body.companyEmail
                }
            );
            res.status(200).json(reg);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    updateSocialMedia: async (req, res, next) => {
        try {
            const reg = await Settings.findByIdAndUpdate(
                { _id: req.body._id },
                {
                    socialMedia: {
                        facebook: req.body.facebook,
                        instagram: req.body.instagram,
                        twitter: req.body.twitter,
                        google: req.body.google,
                        youtube: req.body.youtube,
                        google: req.body.google
                    }
                }
            );
            res.status(200).json(reg);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    updateWhatsapp: async (req, res, next) => {
        try {
            const reg = await Settings.findByIdAndUpdate(
                { _id: req.body._id },
                {
                    whatsapp: {
                        phone: req.body.phone,
                        text: req.body.text,
                    }
                }
            );
            res.status(200).json(reg);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    updateLogo: async (req, res, next) => {
        try {

            const result = await cloudinary.uploader.upload(req.file.path);

            const reg = await Settings.findByIdAndUpdate(
                { _id: req.body._id },
                {
                    logoURL: {
                        public_id: result.public_id,
                        imageURL: result.url,
                    }
                }
            );

            await fs.unlink(req.file.path);

            res.status(200).json(reg);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
    deleteLogo: async (req, res, next) => {
        try {

            const reg = await Settings.findByIdAndUpdate(
                { _id: req.body._id },
                {
                    logoURL: {
                        public_id: "",
                        imageURL: "",
                    }
                }
            );

            res.status(200).json(reg);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocurrió un error'
            });
            next();
        }
    }
}