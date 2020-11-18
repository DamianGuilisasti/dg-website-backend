import Post from '../models/Posts';

export default {
    list: async (req, res, next) => {
        try {
            const result = await Post.find();
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
            console.log(req.body);
            const { title, category, author, tags } = req.body;
            const newPost = new Post({ title, category, author, tags });
            const postSaved = await newPost.save();
            res.status(200).json(postSaved);
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

