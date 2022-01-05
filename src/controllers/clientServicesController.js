import ClientServices from "../models/ClientServices";

export default {
  list: async (req, res, next) => {
    try {
      const result = await ClientServices.find();
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
      const newService = new ClientServices({
        name,
        description,
        price,
        serviceType,
      });
      const serviceSaved = await newService.save();
      res.status(200).json(serviceSaved);
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
      const serviceUpdated = await ClientServices.findByIdAndUpdate(
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
      const reg = await ClientServices.findByIdAndDelete({ _id: req.query.id });
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
      const serviceUpdated = await ClientServices.findByIdAndUpdate(
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
      const serviceUpdated = await ClientServices.findByIdAndUpdate(
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
