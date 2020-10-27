import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: [
        {
            ref: "rol",
            type: Schema.Types.ObjectId
        }
    ]

},
    {
        timestamps: true,
        collection: "Usuarios"
    });

    UserSchema.statics.encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    UserSchema.statics.comparePassword = async (password, receivedPassword) => {
        return await bcrypt.compare(password, receivedPassword);
    }

export default model('User', UserSchema);