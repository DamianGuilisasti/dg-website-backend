import Logo from "../models/Logo";
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
  updateIndex: async (req, res, next) => {
    try {
      const logos = req.body.logos;

      await Logo.deleteMany({});
      await Logo.insertMany(logos);
      res.status(200).json(logos);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const result = await Logo.find();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      const newLogo = new Logo({
        logoImg: { public_id: result.public_id, url: result.url },
      });

      const logoSaved = await newLogo.save();
      await fs.unlink(req.file.path);
      res.status(200).json(logoSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocurrió un error",
      });
      next();
    }
  },
  deleteLogoById: async (req, res, next) => {
    try {
      const reg = await Logo.findByIdAndDelete({ _id: req.query.id });

      await cloudinary.uploader.destroy(
        reg.logoImg.public_id,
        function (result, error) {
          if (error) {
            console.log(error);
          }
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activateLogoById: async (req, res, next) => {
    try {
      const logoUpdated = await Logo.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(logoUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivateLogoById: async (req, res, next) => {
    try {
      const logoUpdated = await Logo.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(logoUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};
