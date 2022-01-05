import express from "express";
import budgetController from "../controllers/budgetController";
import uploadPDF from "../middlewares/uploadPDF";
import uploadBill from "../middlewares/uploadBill";
import verify from "../middlewares/index";

const router = express.Router();

router.get(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.list
);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.updateBudgetById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.activateBudgetById
);
router.put(
  "/approved",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.approvedBudgetById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.desactivateBudgetById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.deleteBudgetById
);
router.post(
  "/uploadPDF",
  uploadPDF,
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.uploadPDF
);
router.post(
  "/uploadBillPDF",
  uploadBill,
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  budgetController.sendEmailManually
);

export default router;
