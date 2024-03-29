import Expense from "../models/Expense";
const { httpError } = require("../helpers/handleError");

export default {
  list: async (req, res, next) => {
    try {
      const result = await Expense.find();
      res.status(200).json(result);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  create: async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.price) {
        res.status(400).send({
          message: "Name is required",
        });
        return;
      }

      if (
        typeof req.body.name !== "string" ||
        typeof req.body.price !== "number"
      ) {
        res.status(400).send({
          message: "Name and price must be a string and a number",
        });
        return;
      }

      const { name, price } = req.body;
      const newExpense = new Expense({ name, price });
      const expenseSaved = await newExpense.save();
      res.status(201).json(expenseSaved);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  updateExpenseById: async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.price) {
        res.status(400).send({
          message: "Name is required",
        });
        return;
      }

      if (
        typeof req.body.name !== "string" ||
        typeof req.body.price !== "number"
      ) {
        res.status(400).send({
          message: "Name and price must be a string and a number",
        });
        return;
      }
      const expenseUpdated = await Expense.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: false }
      );
      res.status(204).json(expenseUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  deleteExpenseById: async (req, res, next) => {
    try {
      console.log(req.params.id);
      const reg = await Expense.findByIdAndDelete({ _id: req.query.id });
      res.status(204).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  activateExpenseById: async (req, res, next) => {
    try {
      const expenseUpdated = await Expense.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: false }
      );
      res.status(204).json(expenseUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  desactivateExpenseById: async (req, res, next) => {
    try {
      const expenseUpdated = await Expense.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(204).json(expenseUpdated);
    } catch (error) {
      httpError(res, error, next);
    }
  },
};
