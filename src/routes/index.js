import express from 'express';
import PostsRouter from './PostsRouter';
import ProductRouter from './ProductRouter';
import UsersRouter from './UsersRouter';
import SettingsRouter from './SettingsRouter';

const router = express.Router();

router.use('/publicaciones', PostsRouter);
router.use('/productos', ProductRouter);
router.use('/user', UsersRouter);
router.use('/settings', SettingsRouter);

export default router;