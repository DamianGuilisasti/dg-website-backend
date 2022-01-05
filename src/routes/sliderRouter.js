import express from "express";
import sliderController from "../controllers/sliderController";
import upload from "../middlewares/upload";
import verify from "../middlewares";

const router = express.Router();

router.get("/", sliderController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  sliderController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  sliderController.updateSliderById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.activateSliderById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.desactivateSliderById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.deleteSliderById
);
router.post(
  "/updateIndex",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.updateIndex
);

export default router;
