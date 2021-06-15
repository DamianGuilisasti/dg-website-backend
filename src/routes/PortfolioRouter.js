import express from "express";
import PortfolioController from "../controllers/PortfolioController";
import upload from "../middlewares/uploadMultipleFiles";

const router = express.Router();

router.get("/list", PortfolioController.list);
router.post("/add", upload, PortfolioController.add);
router.put("/update", upload, PortfolioController.updatePortfolioById);
router.put("/activate", PortfolioController.activatePortfolioById);
router.put("/desactivate", PortfolioController.desactivatePortfolioById);
router.delete("/delete", PortfolioController.deletePortfolioById);

export default router;
