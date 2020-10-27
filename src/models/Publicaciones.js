import mongoose, { Schema } from 'mongoose';

const PublicacionesSchema = new Schema({
    name: {
        type: String
    }
},
{
    timestamps: true,
    collection: 'publicaciones'
});

const Publicaciones = mongoose.model('Post', PublicacionesSchema);

export default Publicaciones;