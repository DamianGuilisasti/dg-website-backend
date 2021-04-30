import Logos from "../models/Logos";
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
  list: async (req, res, next) => {
    try {
      const result = await Logos.find();
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

      console.log(req.file.path);

      const newLogo = new Logos({
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
      const reg = await Logos.findByIdAndDelete({ _id: req.query.id });
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
      const logoUpdated = await Logos.findByIdAndUpdate(
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
      const logoUpdated = await Logos.findByIdAndUpdate(
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
