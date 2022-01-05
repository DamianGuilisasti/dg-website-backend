import portfolioController from "../controllers/portfolioController";
import express from "express";
import upload from "../middlewares/uploadMultipleFiles";
import verify from "../middlewares";

const router = express.Router();

router.get("/", portfolioController.list);
router.get("/listActives", portfolioController.listActives);
router.get("/portfolio", portfolioController.getPortfolio);
router.post("/relatedprojects", portfolioController.getRelatedProjects);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioController.add
);
router.post(
  "/uploadimage",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  portfolioController.uploadimage
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioController.updatePortfolioById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioController.activatePortfolioById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioController.desactivatePortfolioById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioController.deletePortfolioById
);

export default router;
