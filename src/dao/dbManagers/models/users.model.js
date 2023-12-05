import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart:{
        //se define la referencia a la colección de carts
        type:[
            {
                cart : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default:[]
    },
    role : {
        type: String,
        default: 'USER' //para todos los usuarios normales excepto el admin
    }
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;