import Slider from "../models/Slider";
import Setting from "../models/Setting";
import cloudinary from "cloudinary";
import fs from "fs-extra";
const { httpError } = require("../helpers/handleError");

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  setSlidersOrder: async (req, res, next) => {
    try {
      const sliders = req.body.sliders;

      await Slider.deleteMany({});
      await Slider.insertMany(sliders);
      res.status(204).json(sliders);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  list: async (req, res, next) => {
    try {
      const result = await Slider.find();
      res.status(200).json(result);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  create: async (req, res, next) => {
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
      res.status(204).json(sliderSaved);
    } catch (error) {
      console.log(error);
      httpError(res, error, next);
    }
  },
  createVideoSlider: async (req, res, next) => {
    try {
      const settings = await Setting.find();

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: "video",
        chunk_size: 6000000,
/*         eager: [
          { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ], */
        eager_async: true,
      });

      const settingsUpdated = await Setting.findByIdAndUpdate(settings[0]._id, {
        videobackground: { public_id: result.public_id, url: result.url },
      });

      await fs.unlink(req.file.path);
      res.status(204).json(settingsUpdated);
    } catch (error) {
      httpError(res, error, next);
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

        res.status(204).json(sliderUpdated);
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
        res.status(204).json(sliderUpdated);
      }
    } catch (error) {
      httpError(res, error, next);
    }
  },
  deleteSliderById: async (req, res, next) => {
    try {
      const reg = await Slider.findByIdAndDelete({ _id: req.query.id });
      await cloudinary.uploader.destroy(
        reg.sliderImg.public_id,
        function (result, error) {
          if (result) {
            console.log(result);
          }
          if (error) {
            console.log(error);
          }
        }
      );
      res.status(204).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  deleteBackgroundVideo: async (req, res, next) => {
    try {
      const { deleteBackgroundVideo } = req.body;

      await cloudinary.v2.api.delete_resources(
        deleteBackgroundVideo,
        { resource_type: "video" },
        function (result, error) {
          if (result) {
            console.log(result);
          }
          if (error) {
            console.log(error);
            return;
          }
        }
      );

      const settingUpdated = await Setting.findByIdAndUpdate(
        { _id: req.body._id },
        {
          videobackground: {
            public_id: "",
            url: "",
          },
        },
        { new: true }
      );

      res.status(204).json(settingUpdated);
    } catch (error) {
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },
};
