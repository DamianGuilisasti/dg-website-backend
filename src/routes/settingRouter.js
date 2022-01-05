import express from "express";
import settingController from "../controllers/settingController";
import upload from "../middlewares/upload";
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
  upload,
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
  upload,
  settingController.updateCompanyImg
);
router.put(
  "/deleteCompanyImg",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  settingController.deleteCompanyImg
);

export default router;
