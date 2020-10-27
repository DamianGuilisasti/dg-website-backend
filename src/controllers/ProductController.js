import Product from '../models/Product';

export default {

    createProduct: async (req, res, next) => {
        try {
            const { name, category, price, imgUrl } = req.body;
            const newProduct = new Product({ name, category, price, imgUrl });
            const newProductSaved = await newProduct.save();
            res.status(200).json(newProductSaved);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    getProducts: async (req, res, next) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const product = await Product.findById(req.body._id);
            res.status(200).json(product);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    updateProductById: async (req, res, next) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }); //el new es para que me devuelva los datos actualizados, no el registro viejo.
            res.status(200).json(updatedProduct);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    deleteProductById: async (req, res, next) => {
        try {
            await Product.findByIdAndDelete(req.body._id);
            res.status(200).json();
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}
