import Service from "../models/Services";

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
      const { name, description, price, serviceType } = req.body;
      const newService = new Service({ name, description, price, serviceType });
      const serviceSaved = await newService.save();
      res.status(200).json(serviceSaved);
      //const reg = await models.Post.create(req.body);
      //res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(error);
    }
  },
  updateServiceById: async (req, res, next) => {
    try {
      const serviceUpdated = await Service.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
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
