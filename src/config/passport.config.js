
import passport from 'passport';
import jwt from 'passport-jwt';
import local from 'passport-local';
import usersModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import { passportStrategiesEnum } from './enums.config.js';
import { PRIVATE_KEY_JWT } from './constants.config.js';


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use(passportStrategiesEnum.JWT, new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY_JWT

    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user) //req.user
        } catch (error) {
            return done(error);
        }
    }))

    //poner aca lo de github??

};

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies[PRIVATE_KEY_JWT];
    }
    return token;
}

export default initializePassport;









// //local es autenticación con usuario y contraseña
// const LocalStrategy = local.Strategy;

// const initializePassport = () => {
//     //Implementación de nuestro registro
//     passport.use('register', new LocalStrategy({
//         passReqToCallback: true, //Permite acceder al objeto request como cualquier otro middleware
//         usernameField: 'email'
//     }, async (req, username, password, done) =>{
//         try {
//             const { first_name, last_name, age } = req.body; //en username y password ya me llega en passport
//             const user = await usersModel.findOne({ email: username });

//             if (user){
//                 return done(null, false); //no hay error, ya se encuentra ese usuario
//             }

//             //sino está
//             const userToSave = {
//                 first_name,
//                 last_name,
//                 email: username,
//                 age,
//                 password : createHash(password)
//             }

//             const result = await usersModel.create(userToSave);
//             return done(null, result); //req.user
        
//         } catch (error) {
//             return done('Incorrect credentials');
//         }
//     }));

//     //Implementación de nuestro login passport
//     passport.use('login', new LocalStrategy({
//         usernameField: 'email'
//     }, async (username, password, done) =>{
//         try {

//             const user = await usersModel.findOne({ email: username });

//             if(!user || !isValidPassword(password, user.password)){
//                 return done (null, false);
//             }

//             return done(null, user); //setea req.user

            
//         } catch (error) {
//             return done('Incorrect credentials');
//         }
//     }));

//     passport.use('github', new GitHubStrategy({ 
//         clientID: 'Iv1.6e82d9980f9d4a38',
//         clientSecret: 'e518bfba7c10c19b4e2d7cf9e68e38c613930977',
//         callbackURL: 'http://localhost:8080/api/sessions/github-callback',
//         scope:['user:email']

//     }, async (accessToken, refreshToken, profile, done) =>{
//         try {
//             console.log(profile);
//             const email =  profile.emails[0].value;
//             const user = await usersModel.findOne({ email });

//             if(!user){//valido el correo
//                 //crear la cuenta o usuario desde cero
//                 const newUser ={
//                     first_name: profile._json.name,
//                     last_name: '', //no viene desde github
//                     age: 18, //no viene desde github
//                     email,
//                     password: '' //no se requiere, el trabajo ya lo hace github 
//                 }
               
//                 const result = await usersModel.create(newUser);
//                 return done(null, result); //req.user
//             } else{
//                 return done(null, user);
//             }        
//         } catch (error) {
//             return done('Incorrect credentials');
//         }
//     }));


//     //Serialización y deSerialización
//     passport.serializeUser((user, done)=>{
//         done(null, user._id);
//     });

//     passport.deserializeUser(async(id, done) =>{
//         const user = await usersModel.findById(id);
//         done(null, user);
//     })
// }

