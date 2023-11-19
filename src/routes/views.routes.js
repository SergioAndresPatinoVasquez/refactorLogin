import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { productsModel } from '../dao/dbManagers/models/products.model.js';
import { cartsModel } from '../dao/dbManagers/models/carts.model.js';

const router = Router ();

const productsManager = new Products();
const cartsManager = new Carts();


const publicAccess = (req, res, next) => {
    if(req.session?.user) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session?.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAccess, (req, res) => {
    res.render('register')
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login')
});

router.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.session.user
       
    })
    
});



//paginate
router.get('/products', async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;

        const user = req.session.user;

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
        console.error(error.message);
    }
});


router.get('/carts-view', async(req,res)=>{
    try {
        const carts = await cartsManager.readCarts();
        res.render('carts', {carts});
    } catch (error) {
        console.error(error.message);
    }
});


router.get('/carts/:cid', async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsModel.findById(cartId).lean();
        res.render('cartId', {cart});
    } catch (error) {
        console.error(error.message);
    }
});


export default router;