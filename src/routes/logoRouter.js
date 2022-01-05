import express from "express";
import logoController from "../controllers/logoController";
import upload from "../middlewares/upload";
import verify from "../middlewares";

const router = express.Router();

router.get("/", logoController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  logoController.add
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  logoController.activateLogoById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  logoController.desactivateLogoById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  logoController.deleteLogoById
);
router.post(
  "/updateIndex",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  logoController.updateIndex
);

export default router;
