import express from "express";
import ExpensesController from "../controllers/ExpensesController";
import verify from "../middlewares";

const router = express.Router();

router.get(
  "/list",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.list
);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.add
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.updateExpenseById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.activateExpenseById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.desactivateExpenseById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ExpensesController.deleteExpenseById
);

export default router;
