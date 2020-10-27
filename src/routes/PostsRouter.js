import express from 'express';
import PostsController from '../controllers/PostsController';

const router = express.Router();

router.get('/list', PostsController.list);
router.post('/add', PostsController.add);

export default router;