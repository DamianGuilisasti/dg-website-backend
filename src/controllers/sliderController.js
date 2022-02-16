import Slider from "../models/Slider";
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
      const sliders = req.body.sliders;

      await Slider.deleteMany({});
      await Slider.insertMany(sliders);
      res.status(200).json(sliders);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const result = await Slider.find();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const { title, subtitle, buttonText, buttonURL } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path);

      const newSlider = new Slider({
        title,
        subtitle,
        buttonText,
        buttonURL,
        sliderImg: { public_id: result.public_id, url: result.url },
      });

      const sliderSaved = await newSlider.save();
      await fs.unlink(req.file.path);
      res.status(200).json(sliderSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has occured",
      });
      next();
    }
  },
  updateSliderById: async (req, res, next) => {
    try {
      if (req.body.newSliderImg == "true") {
        const slider = await Slider.findById({ _id: req.body._id });
        await cloudinary.uploader.destroy(
          slider.sliderImg.public_id,
          function (result, error) {
            if (error) {
              console.log(error);
            }
          }
        );
        const result = await cloudinary.uploader.upload(req.file.path);
        const sliderUpdated = await Slider.findByIdAndUpdate(
          { _id: req.body._id },
          {
            title: req.body.title,
            subtitle: req.body.subtitle,
            buttonText: req.body.buttonText,
            buttonURL: req.body.buttonURL,
            sliderImg: { public_id: result.public_id, url: result.url },
          },
          { new: true }
        );
        await fs.unlink(req.file.path);

        res.status(200).json(sliderUpdated);
      } else {
        const sliderUpdated = await Slider.findByIdAndUpdate(
          { _id: req.body._id },
          {
            title: req.body.title,
            subtitle: req.body.subtitle,
            buttonText: req.body.buttonText,
            buttonURL: req.body.buttonURL,
          },
          { new: true }
        );
        res.status(200).json(sliderUpdated);
      }
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  deleteSliderById: async (req, res, next) => {
    try {
      const reg = await Slider.findByIdAndDelete({ _id: req.query.id });
      await cloudinary.uploader.destroy(
        reg.sliderImg.public_id,
        function (result, error) {
          if (error) {
            console.log(error);
          }
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
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
        message: "An error has occured",
      });
      return next(error);
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
        message: "An error has occured",
      });
      return next(error);
    }
  },
};
