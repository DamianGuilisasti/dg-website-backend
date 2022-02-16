import Menu from "../models/Menu";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Menu.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.link) {
        res.status(400).send({
          message: "Name and link are required",
        });
        return;
      }

      if (
        typeof req.body.name !== "string" ||
        typeof req.body.link !== "string"
      ) {
        res.status(400).send({
          message: "Name and link must be a string",
        });
        return;
      }

      const { name, link } = req.body;
      const newMenu = new Menu({ name, link });
      const MenuSaved = await newMenu.save();
      res.status(201).json(MenuSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  updateMenuById: async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.link) {
        res.status(400).send({
          message: "Name and link are required",
        });
        return;
      }

      if (
        typeof req.body.name !== "string" ||
        typeof req.body.link !== "string"
      ) {
        res.status(400).send({
          message: "Name and link must be strings",
        });
        return;
      }
      const MenuUpdated = await Menu.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: false }
      );
      res.status(204).json(MenuUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  deleteMenuById: async (req, res, next) => {
    try {
      const reg = await Menu.findByIdAndDelete({ _id: req.query.id });
      res.status(204).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  activateMenuById: async (req, res, next) => {
    try {
      const MenuUpdated = await Menu.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: false }
      );
      res.status(204).json(MenuUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  desactivateMenuById: async (req, res, next) => {
    try {
      const MenuUpdated = await Menu.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(204).json(MenuUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  saveNewOrder: async (req, res, next) => {
    try {
      const { menus } = req.body;

      if (!menus) {
        res.status(400).send({
          message: "Menus are required",
        });
        return;
      }

      await Menu.deleteMany({});
      const MenuUpdated = await Menu.insertMany(menus);

      res.status(204).json(MenuUpdated);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
};
