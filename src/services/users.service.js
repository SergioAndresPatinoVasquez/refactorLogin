import Users from '../dao/dbManagers/users.manager.js';
import { createHash } from "../utils.js";

const usersManager = new Users();


const getByemailLogin = async (email) =>{

    const result = await usersManager.getByemail(email);
    return result;

}

const getByemailRegister = async (email) =>{

    const existsUser = await usersManager.getByemail(email);
    return existsUser;


}

const saveServices = async (first_name, last_name, email, age, password) =>{

    const hashedPassword = createHash(password);
        
    const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
    };

    const result = await usersManager.save(newUser);
    return result;

}


export {
    getByemailLogin,
    getByemailRegister,
    saveServices
}