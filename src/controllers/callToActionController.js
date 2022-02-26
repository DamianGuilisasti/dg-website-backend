import CallToAction from "../models/CallToAction";
import cloudinary from "cloudinary";
import fs from "fs-extra";
const { httpError } = require("../helpers/handleError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  list: async (req, res, next) => {
    try {
      const result = await CallToAction.find();
      res.status(200).json(result);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  create: async (req, res, next) => {
    try {
      if (
        typeof req.body.title !== "string" ||
        typeof req.body.subtitle !== "string" ||
        typeof req.body.link !== "string" ||
        typeof req.body.buttonText !== "string" ||
        typeof req.body.backgroundImg.url !== "string"
      ) {
        res.status(400).send({
          message:
            "title, subtitle, link, buttonText and backgroundImg must be a string",
        });
        return;
      }

      const { title, subtitle, buttonText, link, backgroundImg } = req.body;
      const newCallToAction = new CallToAction({
        title,
        subtitle,
        buttonText,
        link,
        backgroundImg,
      });
      const CallToActionSaved = await newCallToAction.save();
      res.status(201).json(CallToActionSaved);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  updateCallToActionById: async (req, res, next) => {
    try {
      if (
        typeof req.body.title !== "string" ||
        typeof req.body.subtitle !== "string" ||
        typeof req.body.link !== "string" ||
        typeof req.body.buttonText !== "string"
      ) {
        res.status(400).send({
          message: "title, subtitle, link and buttonText must be a string",
        });
        return;
      }
      const CallToActionUpdated = await CallToAction.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: false }
      );
      res.status(204).json(CallToActionUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  updateBackgroundImage: async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      const CallToActionUpdated = await CallToAction.findByIdAndUpdate(
        { _id: req.body.calltoactionId },
        {
          backgroundImg: {
            public_id: result.public_id,
            url: result.url,
          },
        },
        { new: false }
      );

      const public_id = req.body.public_id;

      if (public_id.length > 0) {
        await cloudinary.uploader.destroy(public_id, function (result, error) {
          console.log(result);
          if (error) {
            console.log(error);
          }
        });
      }

      await fs.unlink(req.file.path);
      res.status(204).json(CallToActionUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  deleteCallToActionById: async (req, res, next) => {
    try {
      const reg = await CallToAction.findByIdAndDelete({ _id: req.query.id });
      res.status(204).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  deleteBackgroundImage: async (req, res, next) => {
    try {
      const CallToActionUpdated = await CallToAction.findByIdAndUpdate(
        { _id: req.body._id },
        {
          backgroundImg: {
            public_id: "",
            url: "",
          },
        },
        { new: false }
      );

      const public_id = req.body.public_id;

      if (public_id.length > 0) {
        await cloudinary.uploader.destroy(public_id, function (result, error) {
          console.log(result);
          if (error) {
            console.log(error);
          }
        });
      }

      res.status(204).json(CallToActionUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  activateCallToActionById: async (req, res, next) => {
    try {
      const CallToActionUpdated = await CallToAction.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: false }
      );
      res.status(204).json(CallToActionUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  desactivateCallToActionById: async (req, res, next) => {
    try {
      const CallToActionUpdated = await CallToAction.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(204).json(CallToActionUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
};
