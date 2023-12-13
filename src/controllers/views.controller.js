

import { cartsView as cartsViewService, cartsIdView as cartsIdViewService,
       productsView as productsViewService} from '../services/views.service.js';




 const productsView = async (req,res) => {
        try {
           // Verificar la autenticación del usuario
        if (!req.isAuthenticated()) {
          return res.sendClientError('User not authenticated');
        }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 2;

            //const user = req.isAuthenticated()? req.user : null;
            const user = req.user; // Obtener el usuario autenticado

            const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsViewService(page, limit);
         
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

    const cartsView = async (req,res) => {
        try {
            const carts = await cartsViewService();
            res.render('carts', {carts});
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    const cartsIdView = async  (req,res) =>{
        try {
            const cartId = req.params.cid;
            const cart = await cartsIdViewService();
            res.render('cartId', {cart});
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    const registerView = async (req, res) => {
        try {
          // Puedes agregar lógica adicional aquí si es necesario
          res.render('register'); // "register" sería el nombre de tu archivo de vista (sin la extensión)
        } catch (error) {
          res.sendServerError(error.message);
        }
      }
 
      const loginView = async (req, res) =>{
        try {
          // Puedes agregar lógica adicional aquí si es necesario
          res.render('login'); // "register" sería el nombre de tu archivo de vista (sin la extensión)
        } catch (error) {
          res.sendServerError(error.message);
        }
      }


      export {
        productsView,
        cartsView,
        cartsIdView,
        registerView,
        loginView


      }