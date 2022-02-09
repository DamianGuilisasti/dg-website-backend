import Setting from "../models/Setting";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  addSettings: async (req, res, next) => {
    try {
      const {
        aboutInfo,
        companyName,
        socialMedia,
        logoURL,
        companyPhone,
        whatsapp,
        companyEmail,
        companyAddress,
      } = req.body;
      const newConfiguration = new Setting({
        aboutInfo,
        companyName,
        socialMedia,
        logoURL,
        companyPhone,
        whatsapp,
        companyEmail,
        companyAddress,
      });

      const newConfigurationSaved = await newConfiguration.save();
      res.status(200).json(newConfigurationSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  listSettings: async (req, res, next) => {
    try {
      const settings = await Setting.find();
      res.status(200).json(settings);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateInfo: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          aboutInfo: req.body.aboutInfo,
          companyName: req.body.companyName,
          companyPhone: req.body.companyPhone,
          companyEmail: req.body.companyEmail,
          companyAddress: req.body.companyAddress,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateSocialMedia: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          socialMedia: {
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            google: req.body.google,
            youtube: req.body.youtube,
            google: req.body.google,
            linkedin: req.body.linkedin,
          },
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateWhatsapp: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          whatsapp: {
            phone: req.body.phone,
            text: req.body.text,
          },
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateLogo: async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          logoURL: {
            public_id: result.public_id,
            imageURL: result.url,
          },
        }
      );

      await fs.unlink(req.file.path);

      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateCompanyImg: async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          companyImg: {
            public_id: result.public_id,
            imageURL: result.url,
          },
        }
      );

      await fs.unlink(req.file.path);

      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateCompanyURL: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          companyURL: req.body.companyURL,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  deleteLogo: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          logoURL: {
            public_id: "",
            imageURL: "",
          },
        }
      );

      await cloudinary.uploader.destroy(
        reg.logoURL.public_id,
        function (result, error) {
          if (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  deleteCompanyImg: async (req, res, next) => {
    try {
      const reg = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          companyImg: {
            public_id: "",
            imageURL: "",
          },
        }
      );

      console.log(reg);

      await cloudinary.uploader.destroy(
        reg.companyImg.public_id,
        function (result, error) {
          if (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
};
