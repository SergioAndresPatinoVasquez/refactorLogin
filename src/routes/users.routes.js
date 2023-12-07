import Router from './router.js';
import Users from '../dao/dbManagers/users.manager.js'
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.config.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import { PRIVATE_KEY_JWT } from '../config/constants.config.js';

export default class UsersRouter extends Router {
   constructor(){
       super();
       this.usersManager = new Users();
   }

   init () {
      this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.login);
      this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.register);
   }

   async register (req, res){
      try {
          const { first_name, last_name, email, age, password } = req.body;
  
          // Agrega la lógica de validación según tus necesidades
          if (!first_name || !last_name || !email || !age || !password) {
              return res.status(400).json({ error: 'incomplete values' });
          }
  
          const existsUser = await this.usersManager.getByemail(email);
  
          if (existsUser) {
              return res.status(400).json({ error: 'user already exists' });
          }
  
          const hashedPassword = createHash(password);
  
          const newUser = {
              first_name,
              last_name,
              email,
              age,
              password: hashedPassword,
          };
  
          const result = await this.usersManager.save(newUser);
  
          const accessToken = generateToken(result);
          console.log("Token login", accessToken)
          res.status(201).json({ status: 'success', access_token: accessToken });
      } catch (error) {
          console.error('Error en el registro:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
      }
  }


   async login (req, res) {
    try {
       const {email, password} = req.body
       if(!email || !password){
          return res.sendClientError('incomplete values')
       }

      const user = await this.usersManager.getByemail(email);
      if(!user){
        return res.sendClientError('incorrect credential')
      }

      const comparePassword = isValidPassword(password, user.password);

      if(!comparePassword){
        return res.sendClientError('incorrect credential')
      }

      const{password:_, ...userResult} = user

      const accessToken = generateToken(userResult);
      console.log("Token login", accessToken)
      res.cookie('coderCookieToken', accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true}).send({status:'success', message:'login success'})
      //res.sendSuccess(accessToken);       
     
    } catch (error) {
       res.sendServerError(error.message);
    } 
 }

}


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(users);
//         console.log(email, password);

//         const user = users.find(user => user.email === email && user.password === password);

//         if (!user) return res.status(401).send({ status: 'error', message: 'invalid credentials' });

//         //generar el jwt
//         const { password: _, ...userResult } = user;
//         const accessToken = generateToken(userResult);
//         res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: 'success', message: 'login success' })
//     } catch (error) {
//         res.status(500).send({ status: 'error', message: error.message });
//     }
// });