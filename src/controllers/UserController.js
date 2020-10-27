import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Roles from '../models/Roles';

export default {
    login: async (req, res, next) => {
        const { username, email, password, rol } = req.body;
        
        const userFound = await User.findOne({email: email}).populate("rol");

        if (!userFound){
            return res.status(400).send({
                message: "No se encontró al usuario"
            });
        }
        const matchPassword = await User.comparePassword(password, userFound.password);

        if (!matchPassword) return res.status(401).json({token: null, message: "Contraseña incorrecta"});

        const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400});

        res.status(200).json({token});
        
    },
    register: async (req, res, next) => {
        const { username, email, password, rol } = req.body;

        const newUser = new User({
            username, email, password: await User.encryptPassword(password)
        });

        if (rol) {
            const foundRoles = await Roles.find({
                name: {$in: rol} 
            })
            newUser.rol = foundRoles.map(rol => rol._id);
        }
        else{
            const role = await Roles.findOne({name: "client"});
            newUser.rol = [role._id];
        }

        const newUserSaved = await newUser.save();

        const token = jwt.sign({id: newUserSaved._id}, config.SECRET, {expiresIn: 86400});  

        res.status(200).json(token);


    }
}