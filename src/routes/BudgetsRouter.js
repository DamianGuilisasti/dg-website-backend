import express from "express";
import BudgetsController from "../controllers/BudgetsController";
import uploadPDF from '../middlewares/uploadPDF';

const router = express.Router();

router.get("/list", BudgetsController.list);
router.post("/add", BudgetsController.add);
router.put("/update", BudgetsController.updateBudgetById);
router.put("/activate", BudgetsController.activateBudgetById);
router.put("/approved", BudgetsController.approvedBudgetById);
router.put("/desactivate", BudgetsController.desactivateBudgetById);
router.delete("/delete", BudgetsController.deleteBudgetById);
router.post("/sendEmail", BudgetsController.sendEmail);
router.post("/uploadPDF", uploadPDF, BudgetsController.uploadPDF);

export default router;
