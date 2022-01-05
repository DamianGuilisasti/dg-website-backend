import mongoose, { Schema } from 'mongoose';

const PostsSchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String
    },
    tags: {
        type: String
    },
    state: {
        type: Number, default: 1
    }
},
    {
        timestamps: true,
        collection: 'Posts'
    });

const Posts = mongoose.model('Post', PostsSchema);

export default Posts;