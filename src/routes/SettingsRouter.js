import express from "express";
import SettingsController from "../controllers/SettingsController";
import upload from "../middlewares/upload";
import verify from "../middlewares";

const router = express.Router();

router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.addSettings
);
router.get("/list", SettingsController.listSettings);
router.put(
  "/updateInfo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.updateInfo
);
router.put(
  "/updateSocialMedia",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.updateSocialMedia
);
router.put(
  "/updateWhatsapp",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.updateWhatsapp
);
router.put(
  "/updateLogo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  SettingsController.updateLogo
);
router.put(
  "/updateCompanyURL",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.updateCompanyURL
);
router.put(
  "/deleteLogo",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.deleteLogo
);
router.put(
  "/updateCompanyImg",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  SettingsController.updateCompanyImg
);
router.put(
  "/deleteCompanyImg",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  SettingsController.deleteCompanyImg
);

export default router;
