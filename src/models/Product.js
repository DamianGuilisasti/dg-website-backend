import {Schema , model} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    imgUrl: {
        type: String
    },
},{
    timestamps: true,
    collection: 'Productos'
});

export default model('Product', productSchema);

