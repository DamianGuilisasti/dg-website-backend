import express from "express";
import PortfolioController from "../controllers/PortfolioController";
import upload from "../middlewares/uploadMultipleFiles";
import verify from "../middlewares";

const router = express.Router();

router.get("/list", PortfolioController.list);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PortfolioController.add
);
router.post(
  "/uploadimage",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  PortfolioController.uploadimage
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PortfolioController.updatePortfolioById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PortfolioController.activatePortfolioById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PortfolioController.desactivatePortfolioById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PortfolioController.deletePortfolioById
);

export default router;
