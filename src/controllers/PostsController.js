import models from '../models'
import Publicaciones from '../models/Publicaciones';

export default {
    list: async (req, res, next) => {
        try {
            const result = await models.Publicaciones.find();
            res.status(200).json(result);
        }
        catch(e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    add: async (req, res, next) => {
        try {
            const {name} = req.body;
            const newPost = new Publicaciones({name});
            const postSaved = await newPost.save();
            res.status(200).json(postSaved);
            //const reg = await models.Publicaciones.create(req.body);
            //res.status(200).json(reg);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}

