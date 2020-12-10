import Client from "../models/Clients";
import models from "../models";
export default {
  /*     list: async (req, res, next) => {
        try {
            const result = await Client.find()
            .populate('Services', {name: 1});
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }, */
  /*   list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Clients.find().populate("services.service", {
        name: 1,
        _id: 0,
        price: 1,
      }); //tiene que ir en minúsuclas, no preguntes porque.. jeje
      //.populate('services').populate('service', { name: 1, _id: 0, price: 1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  }, */
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Clients.find().populate("services", {
        name: 1,
        _id: 0,
        price: 1,
        text: 1,
      }); //tiene que ir en minúsuclas, no preguntes porque.. jeje
      //.populate('services').populate('service', { name: 1, _id: 0, price: 1 });
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
      const { name, lastname, email, phone, services } = req.body;
      const newClient = new Client({ name, lastname, email, phone, services });
      const clientSaved = await newClient.save();
      res.status(200).json(clientSaved);
      //const reg = await models.Post.create(req.body);
      //res.status(200).json(reg);
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
      ); //el new es para que me devuelva los datos actualizados, no el registro viejo.
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
  deleteClientById: async (req, res, next) => {
    try {
      const reg = await Client.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};
