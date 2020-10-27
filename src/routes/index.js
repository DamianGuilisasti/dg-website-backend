import express from 'express';
import PostsRouter from './PostsRouter';
import ProductRouter from './ProductRouter';
import UsersRouter from './UsersRouter';

const router = express.Router();

router.use('/publicaciones', PostsRouter);
router.use('/productos', ProductRouter);
router.use('/user', UsersRouter);

export default router;