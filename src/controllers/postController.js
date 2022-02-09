import Post from "../models/Post";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Post.find();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const { title, category, author, tags } = req.body;
      const newPost = new Post({ title, category, author, tags });
      const postSaved = await newPost.save();
      res.status(200).json(postSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error has occured",
      });
      next();
    }
  },
};
