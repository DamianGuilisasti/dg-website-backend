import express from "express";
import SlidersController from "../controllers/SlidersController";
import upload from "../middlewares/upload";
import verify from "../middlewares";

const router = express.Router();

router.get("/list", SlidersController.list);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  SlidersController.add
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  SlidersController.updateSliderById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SlidersController.activateSliderById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SlidersController.desactivateSliderById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SlidersController.deleteSliderById
);
router.post(
  "/updateIndex",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SlidersController.updateIndex
);

export default router;
