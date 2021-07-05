import express from "express";
import BudgetsController from "../controllers/BudgetsController";
import uploadPDF from "../middlewares/uploadPDF";
import uploadBill from "../middlewares/uploadBill";
import verify from "../middlewares/index";

const router = express.Router();

router.get(
  "/list",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.list
);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.add
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.updateBudgetById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.activateBudgetById
);
router.put(
  "/approved",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.approvedBudgetById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.desactivateBudgetById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.deleteBudgetById
);
router.post(
  "/uploadPDF",
  uploadPDF,
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.uploadPDF
);
router.post(
  "/uploadBillPDF",
  uploadBill,
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  BudgetsController.sendEmailManually
);

export default router;
