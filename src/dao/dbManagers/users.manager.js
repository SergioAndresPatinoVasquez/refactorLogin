import usersModel from "./models/users.model.js"

export default class Users {
    constructor(){
        console.log('Working users with DB')
    }

    getByemail = async(email) =>{
        const user = await usersModel.findOne({email}).lean();
        return user;
    }

    save = async(user) => {
        const result = await usersModel.create(user);
        return result;
    }

    
}