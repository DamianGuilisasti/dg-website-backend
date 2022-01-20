import Service from "../models/Service";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import dotenv from "dotenv";
import slugify from "slugify";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  list: async (req, res, next) => {
    try {
      const result = await Service.find();
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
      const {
        name,
        shortdescription,
        description,
        projectExample,
        clientReview,
        deletedImagesPublicID,
        servicesimages,
      } = req.body;

      const slug = slugify(name).toLowerCase();

      if (deletedImagesPublicID) {
        deletedImagesPublicID.map(async function (i) {
          await cloudinary.uploader.destroy(i, function (result, error) {
            if (error) {
              console.log(error);
            }
          });
        });
      }

      const newService = new Service({
        name,
        slug,
        shortdescription,
        description,
        projectExample,
        clientReview,
        deletedImagesPublicID,
        servicesimages: JSON.parse(servicesimages),
      });

      const serviceSaved = await newService.save();

      res.status(200).json(serviceSaved);
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
  updateServiceById: async (req, res, next) => {
    try {
      const {
        name,
        slug,
        shortdescription,
        description,
        projectExample,
        clientReview,
        deletedImagesPublicID,
        servicesimages,
      } = req.body;

      if (deletedImagesPublicID) {
        deletedImagesPublicID.map(async function (i) {
          await cloudinary.uploader.destroy(i, function (result, error) {
            if (error) {
              console.log(error);
            }
          });
        });
      }

      const serviceUpdated = await Service.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name,
          slug,
          shortdescription,
          description,
          projectExample,
          clientReview,
          deletedImagesPublicID,
          servicesimages: JSON.parse(servicesimages),
        }
      );

      res.status(200).json(serviceUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  getService: async (req, res, next) => {
    try {
      const slug = req.query[0];
      const result = await Service.findOne({ slug: slug }).populate("client");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ocurrió un error" });
      next(error);
    }
  },
  deleteServiceById: async (req, res, next) => {
    try {
      const reg = await Service.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activateServiceById: async (req, res, next) => {
    try {
      const serviceUpdated = await Service.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(serviceUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivateServiceById: async (req, res, next) => {
    try {
      const serviceUpdated = await Service.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(serviceUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};
