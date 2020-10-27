import jwt from 'jsonwebtoken';
import User from '../models/User';
import Roles from '../models/Roles';
import config from '../config';

export default {
    isAdmin: async (req, res, next) => {
        const token = req.headers.token;
        const tokenDecoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(tokenDecoded.id).populate("rol");
        const roles = await Roles.find({_id: {$in: user.rol}});

        for (let i = 0; i < roles.length; i++){
            if (roles[i].name === "admin"){
                next();
                return;
            }
        }

        return res.status(403).json({message: "Requiere Admin"});

    },

    isClient: async (req, res, next) => {
        const token = req.headers.token;
        const tokenDecoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(tokenDecoded.id).populate("rol");
        const roles = await Roles.find({_id: {$in: user.rol}});

        for (let i = 0; i < roles.length; i++){
            if (roles[i].name === "client"){
                next();
                return;
            }
        }

        return res.status(403).json({message: "Requiere Cliente"});

    }
}

// obtener ID que viene del token (decodificar token).

// consultar en la base de datos de usuarios, ese ID.

// traerme ese usuario y chequear el rol.