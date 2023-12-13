import Carts from '../dao/dbManagers/carts.manager.js';
import { cartsModel } from "../dao/dbManagers/models/carts.model.js";


const cartsManager = new Carts();


const getAllCarts = async () => {
    const carts = await cartsManager.readCarts();
    return carts;
}

const saveCart = async () => {
   
        const result = await cartsManager.writeCarts();
        return result;
     
}

const updateProductsInCart  = async (carritoId, products) => {

        const result = await cartsManager.updateProductsInCart(carritoId, products);
        return result;
   
}

const updateQuantityProductInCar = async  (cartId, productId, newQuantity) => {

        const result = await cartsManager.updateQuantityProductInCar(cartId, productId, newQuantity);
        return result;
}

const addProductInCart = async  (cartId, productId) =>{

        const result = await cartsManager.addProductInCart(cartId, productId)
        return result;

}

const deleteProductInCart = async  (req, res) => {

        const result = await cartsManager.deleteProductInCart(cartId);
        return result;

}

const deleteProduct = async (cid, pid) => {

        const result = await cartsManager.deleteProduct(cid, pid);
        return result;
}

    //populate
    const getCartsById = async  (Cartid) => {

            const cart = await cartsManager.getCartsById(Cartid);    
            const result = await cartsModel.find(cart).populate('products.product');    
            console.log("Populate", JSON.stringify(result));    
            res.sendSuccess(result);
   

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