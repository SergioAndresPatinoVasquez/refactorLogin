import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.config.js";
import { login, register} from '../controllers/users.controller.js';




export default class UsersRouter extends Router {
   constructor(){
       super();
       //this.usersManager = new Users();
   }

   init () {
      this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, login);
      this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);

    }

//    async register (req, res){
//       try {
//           const { first_name, last_name, email, age, password } = req.body;
  
//           // Agrega la lógica de validación según tus necesidades
//           if (!first_name || !last_name || !email || !age || !password) {
//               return res.status(400).json({ error: 'incomplete values' });
//           }
  
//           const existsUser = await this.usersManager.getByemail(email);
  
//           if (existsUser) {
//               return res.status(400).json({ error: 'user already exists' });
//           }
  
//           const hashedPassword = createHash(password);
  
//           const newUser = {
//               first_name,
//               last_name,
//               email,
//               age,
//               password: hashedPassword,
//           };
  
//           const result = await this.usersManager.save(newUser);
  
//           const accessToken = generateToken(result);
//           console.log("Token login", accessToken)
//           res.status(201).json({ status: 'success', access_token: accessToken });
//       } catch (error) {
//           console.error('Error en el registro:', error);
//           res.status(500).json({ error: 'Error interno del servidor' });
//       }
//   }


//    async login (req, res) {
//     try {
//        const {email, password} = req.body
//        if(!email || !password){
//           return res.sendClientError('incomplete values')
//        }

//       const user = await this.usersManager.getByemail(email);
//       if(!user){
//         return res.sendClientError('incorrect credential')
//       }

//       const comparePassword = isValidPassword(password, user.password);

//       if(!comparePassword){
//         return res.sendClientError('incorrect credential')
//       }

//       const{password:_, ...userResult} = user

//       const accessToken = generateToken(userResult);
//       console.log("Token login", accessToken)
//       res.cookie('coderCookieToken', accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true}).send({status:'success', message:'login success'})
//       //res.sendSuccess(accessToken);       
     
//     } catch (error) {
//        res.sendServerError(error.message);
//     } 
//  }

//     // Manejador para la autenticación con GitHub
//         async githubLogin(req, res) {
//             try {
//                 // Este controlador se ejecutará después de la autenticación exitosa con GitHub.
//                 // Puedes personalizar este bloque según tus necesidades.
//                 res.sendSuccess({ message: 'Autenticación exitosa con GitHub', user: req.user });
//             } catch (error) {
//                 res.sendServerError(error.message);
//             }
//         }

//             // Manejador para la autenticación con GitHub (callback)
//         async githubLoginCallback(req, res) {
//             const email = req.user.email || (req.user._json && req.user._json.email) || '';
//             const name = (req.user._json && req.user._json.name) || (req.user.displayName || req.user.username) || req.user.first_name || '';
            
//             const userObject = {
//                 name,
//                 email,
//                 age: 18,
//                 role: 'usuario'
//             };
        
//             req.session.user = userObject;
//             res.redirect('/products');
//         }

}

