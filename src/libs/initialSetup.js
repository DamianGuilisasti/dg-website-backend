import Roles from '../models/Roles';

export const createRoles = async () => {
    try {
        const counter = await Roles.estimatedDocumentCount();

        if (counter > 0) return;

        const values = await Promise.all([
            new Roles({ name: 'Cliente' }).save(),
            new Roles({ name: 'Admin' }).save()])

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}