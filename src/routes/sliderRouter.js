import express from "express";
import sliderController from "../controllers/sliderController";
import uploadImage from "../middlewares/uploadImage";
import uploadVideo from "../middlewares/uploadVideo";
import verify from "../middlewares";

const router = express.Router();

router.get("/", sliderController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
  sliderController.create
);
router.post(
  "/video",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadVideo,
  sliderController.createVideoSlider
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
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
  "/setSlidersOrder",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.setSlidersOrder
);
router.put(
  "/deleteBackgroundVideo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  sliderController.deleteBackgroundVideo
);

export default router;
