import Carts from '../dao/dbManagers/carts.manager.js';
import { cartsModel } from "../dao/dbManagers/models/carts.model.js";
import { getAllCarts as getAllCartsServices, saveCart as saveCartsServices,
       updateProductsInCart as updateProductsInCartServices,
       updateQuantityProductInCar as updateQuantityProductInCarServices,
       addProductInCart as addProductInCartServices,
       deleteProductInCart as deleteProductInCartServices,
       deleteProduct as deleteProductService,
       getCartsById as getCartsByIdService} from '../services/carts.service.js'


const cartsManager = new Carts();

  const getAllCarts =  async (req, res) => {
        try {
            const carts = await getAllCartsServices();
            res.sendSuccess(carts);
        } catch (error) {
            res.sendServerError(error.message);
        }
        
    }

    const saveCart = async (req,res) => {
        try {
            const result = await saveCartsServices();
            res.sendSuccess({_id:result._id});
        } catch (error) {
            res.sendServerError(error.message);
        }    
    }

    const updateProductsInCart  = async (req,res) => {
        try {
            let carritoId= req.params.cid;
            const products =req.body;      
            
            const result = await updateProductsInCartServices(carritoId, products);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    const updateQuantityProductInCar = async  (req,res) => {
        try {
            const cartId= req.params.cid;
            const productId= req.params.pid;
            const newQuantity =req.body.quantity;       
            
            const result = await updateQuantityProductInCarServices(cartId, productId, newQuantity);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    const addProductInCart = async  (req, res) =>{
        try {
            let cartId =req.params.cid
            let productId =req.params.pid
    
            const result = await addProductInCartServices(cartId, productId)
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }

    const deleteProductInCart = async  (req, res) => {
        try {
            const cartId = req.params.cid;
    
            const result = await deleteProductInCartServices(cartId);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }

    const deleteProduct = async  (req, res) => {
        try {
            const { cid, pid} = req.params;    
            const result = await deleteProductService(cid, pid);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }
    //populate
    const getCartsById = async  (req, res) => {
        try {
            let Cartid = req.params.cid;    I
            const result = await getCartsByIdService(Cartid);    
            //const result = await cartsModel.find(cart).populate('products.product');       
            res.sendSuccess(result);
    
        } catch (error) {            
            res.sendServerError(error.message);  
        }    

     }


     export {
        getAllCarts,
        saveCart,
        updateProductsInCart,
        updateQuantityProductInCar,
        addProductInCart,
        deleteProductInCart,
        deleteProduct,
        getCartsById
     }