import Budget from "../models/Budget";
import mailer from "../config/mailer";
import fs from "fs-extra";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Budget.find().populate("client services", {
        lastname: 1,
        email: 1,
        name: 1,
        serviceType: 1,
        address: 1,
        phone: 1,
        price: 1,
        description: 1,
        _id: 0,
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const { client, services } = req.body;
      const newBudget = new Budget({ client, services });
      const BudgetSaved = await newBudget.save();
      res.status(200).json(BudgetSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  updateBudgetById: async (req, res, next) => {
    try {
      const BudgetUpdated = await Budget.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).json(BudgetUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  deleteBudgetById: async (req, res, next) => {
    try {
      const reg = await Budget.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  activateBudgetById: async (req, res, next) => {
    try {
      const BudgetUpdated = await Budget.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(BudgetUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },

  approvedBudgetById: async (req, res, next) => {
    try {
      const BudgetUpdated = await Budget.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 2 },
        { new: true }
      );
      res.status(200).json(BudgetUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  desactivateBudgetById: async (req, res, next) => {
    try {
      const BudgetUpdated = await Budget.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(BudgetUpdated);
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      return next(error);
    }
  },
  sendEmailManually: async (req, res, next) => {
    try {
      await mailer.sendBillManually(
        req.body.email,
        req.body.name,
        req.body.subject
      );
      await fs.unlink(req.file.path);
      res.status(200).send({
        message: "Email enviado",
      });
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });

      return next(error);
    }
  },
  uploadPDF: async (req, res, next) => {
    try {
      await mailer.sendBudget(req.body.email, req.body.name);
      await fs.unlink(req.file.path);
      res.status(200).send({
        message: "Email enviado",
      });
    } catch (error) {
      res.status(500).send({
        message: "An error has occured",
      });
      console.log(error);
      return next(error);
    }
  },
};
