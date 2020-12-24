import express from 'express';
import ServicesController from '../controllers/ServicesController';

const router = express.Router();

router.get('/list', ServicesController.list);
router.post('/add', ServicesController.add);
router.put('/update', ServicesController.updateServiceById);
router.put('/activate', ServicesController.activateServiceById);
router.put('/desactivate', ServicesController.desactivateServiceById);
router.delete('/delete', ServicesController.deleteServiceById);

export default router;