import express from "express";
import expenseController from "../controllers/expenseController";
import verify from "../middlewares";

const router = express.Router();

router.get(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.list
);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.updateExpenseById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.activateExpenseById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.desactivateExpenseById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  expenseController.deleteExpenseById
);

export default router;
