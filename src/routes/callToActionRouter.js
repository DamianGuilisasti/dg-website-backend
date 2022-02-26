import express from "express";
import callToActionController from "../controllers/callToActionController";
import verify from "../middlewares";
import uploadImage from "../middlewares/uploadImage";

const router = express.Router();

router.get(
  "/",
  /* [verify.verifyToken.verify, verify.verifyRole.isAdmin], */
  callToActionController.list
);
router.post(
  "/",
  /*  [verify.verifyToken.verify, verify.verifyRole.isAdmin], */
  callToActionController.create
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  callToActionController.updateCallToActionById
);
router.put(
  "/background",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
  callToActionController.updateBackgroundImage
);
router.put(
  "/deleteBackground",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  callToActionController.deleteBackgroundImage
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  callToActionController.activateCallToActionById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  callToActionController.desactivateCallToActionById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  callToActionController.deleteCallToActionById
);

export default router;
