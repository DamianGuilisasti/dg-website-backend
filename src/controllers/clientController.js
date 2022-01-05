import Client from "../models/Client";
import Portfolio from "../models/Portfolio";

export default {
  list: async (req, res, next) => {
    try {
      const reg = await Client.find().populate("services", {
        name: 1,
        _id: 1,
        price: 1,
        serviceType: 1,
        description: 1,
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
      const { name, lastname, email, phone, services, company } = req.body;
      const newClient = new Client({
        name,
        lastname,
        email,
        phone,
        services,
        company,
      });
      const clientSaved = await newClient.save();
      res.status(200).json(clientSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next();
    }
  },
  updateClientById: async (req, res, next) => {
    try {
      const clientUpdated = await Client.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).json(clientUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activateClientById: async (req, res, next) => {
    try {
      const clientUpdated = await Client.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(clientUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivateClientById: async (req, res, next) => {
    try {
      const clientUpdated = await Client.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(clientUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  clientPaidById: async (req, res, next) => {
    try {
      const clientUpdated = await Client.findByIdAndUpdate(
        { _id: req.body._id },
        { isPaid: true },
        { new: true }
      );
      res.status(200).json(clientUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  clientNotPaidById: async (req, res, next) => {
    try {
      const clientUpdated = await Client.findByIdAndUpdate(
        { _id: req.body._id },
        { isPaid: false },
        { new: true }
      );
      res.status(200).json(clientUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  deleteClientById: async (req, res, next) => {
    try {
      const Portfolios = await Portfolio.find({
        client: req.query.id,
      });

      if (Portfolios.length == 0) {
        const reg = await Client.findByIdAndDelete({ _id: req.query.id });
        res.status(200).json(reg);
      }

      res.status(500).json({
        message:
          "El cliente tiene un Portfolio activo, elimine primero el portoflio.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  getMonthlyPayments: async (req, res, next) => {
    try {
      const result = await Client.find().populate({
        path: "services",
        match: { serviceType: "Mensual" },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ocurrió un error" });
      next(error);
    }
  },
  getAnnualPayments: async (req, res, next) => {
    try {
      const result = await Client.find().populate({
        path: "services",
        match: { serviceType: "Anual" },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ocurrió un error" });
      next(error);
    }
  },
};
