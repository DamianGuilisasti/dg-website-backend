import express from "express";
import settingController from "../controllers/settingController";
import uploadImage from "../middlewares/uploadImage";
import verify from "../middlewares";

const router = express.Router();

router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.addSettings
);
router.get("/", settingController.listSettings);
router.put(
  "/updateInfo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateInfo
);
router.put(
  "/updateSocialMedia",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateSocialMedia
);
router.put(
  "/updateWhatsapp",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateWhatsapp
);
router.put(
  "/updateLogo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
  settingController.updateLogo
);
router.put(
  "/updateCompanyURL",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateCompanyURL
);
router.put(
  "/deleteLogo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.deleteLogo
);
router.put(
  "/updateCompanyImg",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
  settingController.updateCompanyImg
);
router.put(
  "/setSliderOverlayLevel",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.setSliderOverlayLevel
);
router.put(
  "/activeBackgroundVideo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.activeBackgroundVideo
);
router.put(
  "/createBackgroundImageSlider",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  uploadImage,
  settingController.createBackgroundImageSlider
);
router.put(
  "/updateColor",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateColor
);
router.put(
  "/updateFont",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.updateFont
);
router.put(
  "/deleteBackgroundVideoImage",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.deleteBackgroundVideoImage
);
router.put(
  "/deleteCompanyImg",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.deleteCompanyImg
);

export default router;
