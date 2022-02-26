import Portfolio from "../models/Portfolio";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import dotenv from "dotenv";
import slugify from "slugify";
const { httpError } = require("../helpers/handleError");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  list: async (req, res, next) => {
    try {
      const reg = await Portfolio.find().populate("client category", {
        _id: 1,
        name: 1,
        lastname: 1,
      });
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  listActives: async (req, res, next) => {
    try {
      const reg = await Portfolio.find({ state: 1 }).populate(
        "client category",
        {
          _id: 1,
          name: 1,
          lastname: 1,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  getPortfolio: async (req, res, next) => {
    try {
      const slug = req.query[0];
      const result = await Portfolio.findOne({ slug: slug }).populate(
        "client category"
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "An error has occured" });
      return next(error);
    }
  },
  getRelatedProjects: async (req, res, next) => {
    try {
      const slug = req.body.slug;
      const result = await Portfolio.find({
        slug: { $ne: slug },
        state: 1,
      }).populate("client category");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "An error has occured" });
      return next(error);
    }
  },

  add: async (req, res, next) => {
    try {
      const {
        client,
        description,
        problem,
        solution,
        category,
        link,
        clientReview,
        portfolioimages,
        deletedImagesPublicID,
        name,
      } = req.body;

      const slug = slugify(name).toLowerCase();

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
        name,
        slug,
        description,
        problem,
        solution,
        category,
        link,
        clientReview,
        portfolioimages: JSON.parse(portfolioimages),
      });

      const portfolioSaved = await newPortfolio.save();

      res.status(200).json(portfolioSaved);
    } catch (error) {
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },
  updatePortfolioById: async (req, res, next) => {
    try {
      const {
        client,
        name,
        slug,
        description,
        problem,
        solution,
        category,
        link,
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
          name,
          slug,
          description,
          problem,
          solution,
          category,
          link,
          clientReview,
          portfolioimages: JSON.parse(portfolioimages),
        }
      );

      res.status(200).json(portfolioUpdated);
    } catch (error) {
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },

  deletePortfolioById: async (req, res, next) => {
    try {
      const reg = await Portfolio.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
};
