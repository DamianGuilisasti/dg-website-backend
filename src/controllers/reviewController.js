import Review from "../models/Review";
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
  deleteCanceledLogo: async (req, res, next) => {
    try {
      const logo = req.body.deletedLogoId;
      console.log(logo);
      if (logo) {
        await cloudinary.uploader.destroy(logo, function (result, error) {
          if (result) {
            console.log(result);
            res.status(200).json({ message: "Logo eliminado" });
          }
          if (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const result = await Review.find();
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
      const { author, text, company, logo } = req.body;

      if (!author || !text || !company) {
        res.status(400).json({
          message: "Todos los campos son requeridos",
        });
        return;
      } else {
        console.log(logo);

        const logo2 = {
          public_id: logo.public_id,
          url: logo.url,
        };

        const newReview = new Review({
          author,
          text,
          company,
          logo: logo2,
        });
        const reviewSaved = await newReview.save();
        res.status(200).json(reviewSaved);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  uploadimage: async (req, res, next) => {
    try {
      const Logo = await cloudinary.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      res.status(200).json(Logo);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  updateReviewById: async (req, res, next) => {
    try {
      console.log(req.body.deletedLogoId);
      console.log(req.body.newLogo);
      console.log(req.body);
      if (req.body.deletedLogoId && req.body.newLogo) {
        const reviewUpdated = await Review.findByIdAndUpdate(
          { _id: req.body._id },
          {
            author: req.body.author,
            text: req.body.text,
            company: req.body.company,
            logo: req.body.newLogo,
          },
          { new: true }
        );
        res.status(200).json(reviewUpdated);
      }
      if (!req.body.deletedLogoId) {
        const reviewUpdated = await Review.findByIdAndUpdate(
          { _id: req.body._id },
          {
            author: req.body.author,
            text: req.body.text,
            company: req.body.company,
          },
          { new: true }
        );
        res.status(200).json(reviewUpdated);
      } else {
        res.status(400).json({
          message: "Todos los campos son requeridos",
        });
        return;
      }
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  deleteReviewById: async (req, res, next) => {
    try {
      const reg = await Review.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  activateReviewById: async (req, res, next) => {
    try {
      const reviewUpdated = await Review.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(reviewUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  desactivateReviewById: async (req, res, next) => {
    try {
      const reviewUpdated = await Review.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(reviewUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
};
