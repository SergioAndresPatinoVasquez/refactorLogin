import Router from './router.js'
import Carts from '../dao/dbManagers/carts.manager.js';
import { productsModel } from "../dao/dbManagers/models/products.model.js";
import { cartsModel } from "../dao/dbManagers/models/carts.model.js";
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
//import CartManager from "../managers/CartManager.js";

export default class CartsRouter extends Router {
    constructor(){
        super();
        this.cartsManager = new Carts();
    }

    init () {
        this.get('/', [accessRolesEnum.ADMIN, accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.getAll)
        this.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.save)
        this.put('/:cid', [accessRolesEnum.ADMIN, accessRolesEnum.USER], passportStrategiesEnum.JWT, this.updateProductsInCart)
        this.put('/:cid/products/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.updateQuantityProductInCar)
        this.post('/:cid/products/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.addProductInCart)
        this.delete('/:cid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.deleteProductInCart)
        this.delete('/:cid/products/:pid', [accessRolesEnum.ADMIN, accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.deleteProduct)
        this.get('/:cid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.getCartsById)

    }

    async getAll (req, res) {
        try {
            const carts = await this.cartsManager.readCarts();
            res.sendSuccess(carts);
        } catch (error) {
            res.sendServerError(error.message);
        }
        
    }

    async save (req,res) {
        try {
            const result = await this.cartsManager.writeCarts();
            res.sendSuccessNewResource(result);
        } catch (error) {
            res.sendServerError(error.message);
        }    
    }

    async updateProductsInCart (req,res) {
        try {
            let carritoId= req.params.cid;
            const products =req.body;      
            
            const result = await this.cartsManager.updateProductsInCart(carritoId, products);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async updateQuantityProductInCar (req,res) {
        try {
            const cartId= req.params.cid;
            const productId= req.params.pid;
            const newQuantity =req.body.quantity;       
            
            const result = await this.cartsManager.updateQuantityProductInCar(cartId, productId, newQuantity);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async addProductInCart (req, res) {
        try {
            let cartId =req.params.cid
            let productId =req.params.pid
    
            const result = await this.cartsManager.addProductInCart(cartId, productId)
            res.sendSuccessNewResource(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }

    async deleteProductInCart (req, res) {
        try {
            const cartId = req.params.cid;
    
            const result = await this.cartsManager.deleteProductInCart(cartId);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }

    async deleteProduct (req, res) {
        try {
            const { cid, pid} = req.params;
    
            const result = await this.cartsManager.deleteProduct(cid, pid);
            
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
    
        }
    
    }
    //populate
    async getCartsById (req, res) {
        try {
            let Cartid = req.params.cid;    I
            const cart = await this.cartsManager.getCartsById(Cartid);    
            const result = await cartsModel.find(cart).populate('products.product');    
            console.log("Populate", JSON.stringify(result));    
            res.sendSuccess(result);
    
        } catch (error) {            
            res.sendServerError(error.message);  
        }    

     }
}


// const cartRouter = Router ();
// const cartsManager = new Carts();


// cartRouter.get("/", async (req, res) =>{
//     try {
//         const carts = await cartsManager.readCarts();
//         res.send({status: 'success', payload: carts});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})
//     }
    
// })

// cartRouter.post("/", async (req,res)=>{
//     try {
//         const result = await cartsManager.writeCarts();
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})

//     }

// });


// cartRouter.put("/:cid", async (req,res)=>{
//     try {
//         let carritoId= req.params.cid;
//         const products =req.body;        
        
//         const result = await cartsManager.updateProductsInCart(carritoId, products);
        
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})
//     }
// });

// cartRouter.put("/:cid/products/:pid", async (req,res)=>{
//     try {
//         const cartId= req.params.cid;
//         const productId= req.params.pid;
//         const newQuantity =req.body.quantity;       
        
//         const result = await cartsManager.updateQuantityProductInCar(cartId, productId, newQuantity);
        
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})
//     }
// });


// cartRouter.post("/:cid/products/:pid", async (req, res) =>{
//     try {
//         let cartId =req.params.cid
//         let productId =req.params.pid

//         const result = await cartsManager.addProductInCart(cartId, productId)
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})

//     }

// });

// cartRouter.delete("/:cid", async (req, res) =>{
//     try {
//         const cartId = req.params.cid;

//         const result = await cartsManager.deleteProductInCart(cartId);
        
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})

//     }

// });

// cartRouter.delete("/:cid/products/:pid", async (req, res) =>{
//     try {
//         const { cid, pid} = req.params;

//         const result = await cartsManager.deleteProduct(cid, pid);
        
//         res.send({status: 'success', payload: result});
//     } catch (error) {
//         res.status(500).send({status: 'error', message: error.message})

//     }

// });

// //populate
// cartRouter.get("/:cid", async (req, res) =>{
//     try {
//         let Cartid = req.params.cid;

//         const cart = await cartsManager.getCartsById(Cartid);

//         const result = await cartsModel.find(cart).populate('products.product');

//         console.log("Populate", JSON.stringify(result));

//         res.send({status: 'success', payload: result});

//     } catch (error) {
        
//         res.status(500).send({status: 'error', message: error.message})

//     }
    
    
 
//  });





// // cartRouter.get("/:id", async (req, res) =>{
// //     let id = req.params.id  //ojo es un string 
// //     res.send(await carts.getCartsById(id))
 
// //  });



// export default cartRouter;

