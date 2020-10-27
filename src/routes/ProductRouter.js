import { Router } from 'express';
const router = Router();
import verify from '../middlewares';
import productController from '../controllers/ProductController';

router.post('/add', [verify.verifyToken.verify, verify.verifyRole.isAdmin], productController.createProduct);
router.get('/list', productController.getProducts);
router.get('/get', productController.getProductById);
router.put('/update', [verify.verifyToken.verify, verify.verifyRole.isAdmin], productController.updateProductById);
router.delete('/delete', [verify.verifyToken.verify, verify.verifyRole.isAdmin], productController.deleteProductById);

export default router;