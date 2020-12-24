import express from "express";
import ExpensesController from "../controllers/ExpensesController";

const router = express.Router();

router.get("/list", ExpensesController.list);
router.post("/add", ExpensesController.add);
router.put("/update", ExpensesController.updateExpenseById);
router.put("/activate", ExpensesController.activateExpenseById);
router.put("/desactivate", ExpensesController.desactivateExpenseById);
router.delete("/delete", ExpensesController.deleteExpenseById);

export default router;
