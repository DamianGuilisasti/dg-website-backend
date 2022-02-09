import PortfolioCategoriesCategories from "../models/PortfolioCategories";

export default {
  list: async (req, res, next) => {
    try {
      const reg = await PortfolioCategoriesCategories.find();
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
  listActives: async (req, res, next) => {
    try {
      const reg = await PortfolioCategoriesCategories.find({
        state: 1,
      }).populate("client", {
        _id: 1,
        name: 1,
        lastname: 1,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
  getPortfolioCategories: async (req, res, next) => {
    try {
      const slug = req.query[0];
      const result = await PortfolioCategoriesCategories.findOne({
        slug: slug,
      }).populate("client");
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
      const result = await PortfolioCategoriesCategories.find({
        slug: { $ne: slug },
        state: 1,
      }).populate("client");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "An error has occured" });
      return next(error);
    }
  },

  add: async (req, res, next) => {
    try {
      const { name, state } = req.body;

      const newPortfolioCategories = new PortfolioCategoriesCategories({
        name,
        state,
      });

      const PortfolioCategoriesSaved = await newPortfolioCategories.save();

      res.status(200).json(PortfolioCategoriesSaved);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
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
        message: "An error has occured",
      });
      return next(error);
    }
  },
  updatePortfolioCategoriesById: async (req, res, next) => {
    try {
      const { name, state } = req.body;

      const PortfolioCategoriesUpdated =
        await PortfolioCategoriesCategories.findByIdAndUpdate(
          { _id: req.body._id },
          {
            name,
            state,
          }
        );

      res.status(200).json(PortfolioCategoriesUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  activatePortfolioCategoriesById: async (req, res, next) => {
    try {
      const PortfolioCategoriesUpdated =
        await PortfolioCategoriesCategories.findByIdAndUpdate(
          { _id: req.body._id },
          { state: 1 },
          { new: true }
        );
      res.status(200).json(PortfolioCategoriesUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  desactivatePortfolioCategoriesById: async (req, res, next) => {
    try {
      const PortfolioCategoriesUpdated =
        await PortfolioCategoriesCategories.findByIdAndUpdate(
          { _id: req.body._id },
          { state: 0 },
          { new: true }
        );
      res.status(200).json(PortfolioCategoriesUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },

  deletePortfolioCategoriesById: async (req, res, next) => {
    try {
      const reg = await PortfolioCategoriesCategories.findByIdAndDelete({
        _id: req.query.id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
};
