import ClientServices from "../models/ClientServices";
const { httpError } = require("../helpers/handleError");

export default {
  list: async (req, res, next) => {
    try {
      const result = await ClientServices.find();
      res.status(200).json(result);
    } catch (error) {
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },
  deleteServiceById: async (req, res, next) => {
    try {
      const reg = await ClientServices.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },
};
