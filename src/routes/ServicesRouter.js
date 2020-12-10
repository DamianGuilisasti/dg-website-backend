import express from 'express';
import ServicesController from '../controllers/ServicesController';

const router = express.Router();

router.get('/list', ServicesController.list);
router.post('/add', ServicesController.add);

export default router;