import Slider from "../models/Sliders";
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
      const result = await Slider.find();
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
      const { title, subtitle } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path);

      console.log(req.file.path);

      const newSlider = new Slider({
        title,
        subtitle,
        sliderImg: { public_id: result.public_id, url: result.url },
      });

      const sliderSaved = await newSlider.save();
      await fs.unlink(req.file.path);
      res.status(200).json(sliderSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocurrió un error",
      });
      next();
    }
  },
  updateSliderById: async (req, res, next) => {
    try {
      console.log(req.body)
      if (req.body.newSliderImg == 'true') {
        const result = await cloudinary.uploader.upload(req.file.path);
        const sliderUpdated = await Slider.findByIdAndUpdate(
          { _id: req.body._id },
          { title: req.body.title, subtitle: req.body.subtitle, sliderImg: { public_id: result.public_id, url: result.url } },
          { new: true }
        );
        res.status(200).json(sliderUpdated);
      }
      else {
        const sliderUpdated = await Slider.findByIdAndUpdate(
          { _id: req.body._id },
          { title: req.body.title, subtitle: req.body.subtitle },
          { new: true }
        );
        res.status(200).json(sliderUpdated);
      }

    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  deleteSliderById: async (req, res, next) => {
    try {
      const reg = await Slider.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activateSliderById: async (req, res, next) => {
    try {
      const sliderUpdated = await Slider.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(sliderUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivateSliderById: async (req, res, next) => {
    try {
      const sliderUpdated = await Slider.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(sliderUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};
