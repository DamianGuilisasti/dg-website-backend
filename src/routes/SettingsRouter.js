import express from 'express';
import SettingsController from '../controllers/SettingsController';

const router = express.Router();

router.post('/add', SettingsController.addSettings);
router.get('/list', SettingsController.listSettings);
router.put('/updateInfo', SettingsController.updateInfo);
router.put('/updateSocialMedia', SettingsController.updateSocialMedia);
router.put('/updateWhatsapp', SettingsController.updateWhatsapp);

export default router;