import express from 'express';
import SettingsController from '../controllers/SettingsController';
import upload from '../middlewares/upload';

const router = express.Router();

router.post('/add', SettingsController.addSettings);
router.get('/list', SettingsController.listSettings);
router.put('/updateInfo', SettingsController.updateInfo);
router.put('/updateSocialMedia', SettingsController.updateSocialMedia);
router.put('/updateWhatsapp', SettingsController.updateWhatsapp);
router.put('/updateLogo', upload, SettingsController.updateLogo);
router.put('/deleteLogo', SettingsController.deleteLogo);

export default router;