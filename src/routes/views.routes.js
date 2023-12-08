import Router from './router.js';
import passport from 'passport';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { productsModel } from '../dao/dbManagers/models/products.model.js';
import { cartsModel } from '../dao/dbManagers/models/carts.model.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';


export default class ViewsRouter extends Router{
    constructor(){
        super();
        this.ProductManager = new Products();
        this.cartsManager = new Carts();

    }

    init () {
      this.get('/products', [accessRolesEnum.ADMIN, accessRolesEnum.PUBLIC, accessRolesEnum.USER], passportStrategiesEnum.JWT, this.productsView);
      this.get('/carts', [accessRolesEnum.ADMIN, accessRolesEnum.PUBLIC, accessRolesEnum.USER], passportStrategiesEnum.JWT, this.cartsView)
       this.get('/cartsId-view/:cid', [accessRolesEnum.ADMIN, accessRolesEnum.PUBLIC, accessRolesEnum.USER], passportStrategiesEnum.JWT, this.cartsIdView)
       this.get('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.registerView);
       this.get('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, this.loginView);

    }
 
    async productsView (req,res) {
        try {
           // Verificar la autenticación del usuario
        if (!req.isAuthenticated()) {
          return res.sendClientError('User not authenticated');
        }

        console.log("se autentica", req.isAuthenticated())
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 2;

            //const user = req.isAuthenticated()? req.user : null;
            const user = req.user; // Obtener el usuario autenticado

            const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsModel.paginate({}, {page, limit, lean:true});
            
            res.render('products', {
                products: docs,
                hasPrevPage,
                hasNextPage,
                nextPage,
                prevPage,
                limit,
                user
            }); 
    
        } catch (error) {
           res.sendServerError(error.message);
        }
    }

    async cartsView(req,res){
        try {
            const carts = await this.cartsManager.readCarts();
            res.render('carts', {carts});
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async cartsIdView (req,res){
        try {
            const cartId = req.params.cid;
            const cart = await cartsModel.findById(cartId).lean();
            res.render('cartId', {cart});
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async registerView(req, res) {
        try {
          // Puedes agregar lógica adicional aquí si es necesario
          res.render('register'); // "register" sería el nombre de tu archivo de vista (sin la extensión)
        } catch (error) {
          res.sendServerError(error.message);
        }
      }
 
      async loginView(req, res) {
        try {
          // Puedes agregar lógica adicional aquí si es necesario
          res.render('login'); // "register" sería el nombre de tu archivo de vista (sin la extensión)
        } catch (error) {
          res.sendServerError(error.message);
        }
      }
 }
 
 





// const router = Router ();

// const productsManager = new Products();
// const cartsManager = new Carts();


// const publicAccess = (req, res, next) => {
//     if(req.session?.user) return res.redirect('/');
//     next();
// }

// const privateAccess = (req, res, next) => {
//     if(!req.session?.user) return res.redirect('/login');
//     next();
// }

// router.get('/register', publicAccess, (req, res) => {
//     res.render('register')
// });

// router.get('/login', publicAccess, (req, res) => {
//     res.render('login')
// });

// router.get('/', privateAccess, (req, res) => {
//     res.render('profile', {
//         user: req.session.user
       
//     })
    
// });



// //paginate
// router.get('/products', async(req,res)=>{
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 2;

//         const user = req.session.user;

//         const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsModel.paginate({}, {page, limit, lean:true});
        
//         res.render('products', {
//             products: docs,
//             hasPrevPage,
//             hasNextPage,
//             nextPage,
//             prevPage,
//             limit,
//             user
//         });

        

//     } catch (error) {
//         console.error(error.message);
//     }
// });


// router.get('/carts-view', async(req,res)=>{
//     try {
//         const carts = await cartsManager.readCarts();
//         res.render('carts', {carts});
//     } catch (error) {
//         console.error(error.message);
//     }
// });


// router.get('/carts/:cid', async(req,res)=>{
//     try {
//         const cartId = req.params.cid;
//         const cart = await cartsModel.findById(cartId).lean();
//         res.render('cartId', {cart});
//     } catch (error) {
//         console.error(error.message);
//     }
// });


// export default router;