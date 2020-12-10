import Service from '../models/Services';

export default {
    list: async (req, res, next) => {
        try {
            const result = await Service.find();
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    add: async (req, res, next) => {
        try {
            const { name, price } = req.body;
            const newService = new Service({ name, price });
            const serviceSaved = await newService.save();
            res.status(200).json(serviceSaved);
            //const reg = await models.Post.create(req.body);
            //res.status(200).json(reg);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next();
        }
    },
}

