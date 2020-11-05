import Settings from '../models/Settings';

export default {
    addSettings: async (req, res, next) => {
        try {
            const { aboutInfo, companyName, socialMedia, contactInfo, logoURL } = req.body;
            const newConfiguration = new Settings({
                aboutInfo, companyName, socialMedia, contactInfo, logoURL
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
                    companyName: req.body.companyName
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
    }
}