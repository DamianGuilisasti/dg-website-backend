import Roles from '../models/Roles';

export const createRoles = async () => {
    try {
        const counter = await Roles.estimatedDocumentCount();

        if (counter > 0) return;

        const values = await Promise.all([
            new Roles({ name: 'client' }).save(),
            new Roles({ name: 'admin' }).save()])

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}