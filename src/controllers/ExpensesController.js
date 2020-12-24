import Expenses from "../models/Expenses";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Expenses.find();
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
      const { name, price } = req.body;
      const newExpense = new Expenses({ name, price });
      const expenseSaved = await newExpense.save();
      res.status(200).json(expenseSaved);
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
  updateExpenseById: async (req, res, next) => {
    try {
      const expenseUpdated = await Expenses.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).json(expenseUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  deleteExpenseById: async (req, res, next) => {
    try {
      const reg = await Expenses.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activateExpenseById: async (req, res, next) => {
    try {
      const expenseUpdated = await Expenses.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(expenseUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivateExpenseById: async (req, res, next) => {
    try {
      const expenseUpdated = await Expenses.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(expenseUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};
