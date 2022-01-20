import express from "express";
import reviewController from "../controllers/reviewController";
import verify from "../middlewares";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/", reviewController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.add
);
router.post(
  "/deleteCanceledLogo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.deleteCanceledLogo
);
router.post(
  "/uploadimage",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  reviewController.uploadimage
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.updateReviewById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.activateReviewById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.desactivateReviewById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  reviewController.deleteReviewById
);

export default router;
