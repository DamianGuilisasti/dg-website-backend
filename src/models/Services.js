import { Schema, model } from 'mongoose';

const ServicesSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    price: {
        type: Number
    },
    state: {
        type: Number,
        default: 1
    }
},
    {
        timestamps: true,
        collection: 'Services'
    }
);

const Services = model('Services', ServicesSchema);

export default Services;