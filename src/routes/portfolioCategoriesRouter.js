import express from "express";
import portfolioCategoriesController from "../controllers/portfolioCategoriesController";
import verify from "../middlewares";

const router = express.Router();

router.get("/", portfolioCategoriesController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioCategoriesController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioCategoriesController.updatePortfolioCategoriesById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioCategoriesController.activatePortfolioCategoriesById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioCategoriesController.desactivatePortfolioCategoriesById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  portfolioCategoriesController.deletePortfolioCategoriesById
);

export default router;
