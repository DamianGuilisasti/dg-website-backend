import Portfolio from "../models/Portfolio";
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
      const reg = await Portfolio.find().populate("client", {
        _id: 1,
        name: 1,
        lastname: 1,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const {
        client,
        description,
        problem,
        solution,
        proyectType,
        proyectLink,
        clientReview,
        portfolioimages,
        deletedImagesPublicID,
      } = req.body;

      if (deletedImagesPublicID) {
        deletedImagesPublicID.map(async function (i) {
          await cloudinary.uploader.destroy(i, function (result, error) {
            console.log(result);
            if (error) {
              console.log(error);
            }
          });
        });
      }

      const newPortfolio = new Portfolio({
        client,
        description,
        problem,
        solution,
        proyectType,
        proyectLink,
        clientReview,
        portfolioimages: JSON.parse(portfolioimages),
      });

      const portfolioSaved = await newPortfolio.save();

      res.status(200).json(portfolioSaved);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  uploadimage: async (req, res, next) => {
    try {
      let image = "";
      const images = [];

      if (req.files) {
        await Promise.all(
          req.files.map(async (element) => {
            image = await cloudinary.uploader.upload(element.path);
            images.push({
              public_id: image.public_id,
              url: image.url,
              index: req.body.index,
            });
            await fs.unlink(element.path);
          })
        );
      }
      res.status(200).json(images);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  updatePortfolioById: async (req, res, next) => {
    try {
      const {
        client,
        description,
        problem,
        solution,
        proyectType,
        proyectLink,
        clientReview,
        deletedImagesPublicID,
        portfolioimages,
      } = req.body;

      if (deletedImagesPublicID) {
        deletedImagesPublicID.map(async function (i) {
          await cloudinary.uploader.destroy(i, function (result, error) {
            console.log(result);
            if (error) {
              console.log(error);
            }
          });
        });
      }

      const portfolioUpdated = await Portfolio.findByIdAndUpdate(
        { _id: req.body._id },
        {
          client,
          description,
          problem,
          solution,
          proyectType,
          proyectLink,
          clientReview,
          portfolioimages: JSON.parse(portfolioimages),
        }
      );

      res.status(200).json(portfolioUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activatePortfolioById: async (req, res, next) => {
    try {
      const portfolioUpdated = await Portfolio.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(portfolioUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivatePortfolioById: async (req, res, next) => {
    try {
      const portfolioUpdated = await Portfolio.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(portfolioUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },

  deletePortfolioById: async (req, res, next) => {
    try {
      const reg = await Portfolio.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};