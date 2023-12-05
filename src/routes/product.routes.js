import Router from './router.js';
import Products from '../dao/dbManagers/products.manager.js'
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.config.js";

export default class ProductsRouter extends Router {
   constructor(){
       super();
       this.ProductManager = new Products();
   }

   init () {
      this.get('/', [accessRolesEnum.USER, accessRolesEnum.PUBLIC, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.getAll)
      this.post('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.save)
      this.get('/:id', [accessRolesEnum.ADMIN, accessRolesEnum.USER], passportStrategiesEnum.JWT, this.getProductsById)
      this.delete('/:id', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.deleteProduct)
      this.put('/:id', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.updatedProducts)
    
   }

   async getAll(req, res) {
      try {
         let { limit, page, sort, query, queryValue } = req.query;
         
         console.log(req.query);
   
         const search = await this.ProductManager.getProductsByQuery({
               limit,
               page,
               sort,
               query,
               queryValue
         });
   
         res.sendSuccess(search);   
      } catch (error) {
         res.sendServerError(error.message);
      } 
   }

   async save (req, res) {

      try {
         const {title, description, code, price, status, stock, category, thumbnail} = req.body
      
      if (!title || !description || !code || !price || !status || !category || !thumbnail) {
         return res.sendClientError('incomplete values');
      }   
      const result = await this.ProductManager.writeProducts({
         title,
         description,
         code,
         price,
         status,
         stock,
         category,
         thumbnail
      });   
      res.sendSuccess(result); 
      } catch (error) {
         res.sendServerError(error.message);
      }
   
   }

   async getProductsById (req, res) {
      try {
         let id = req.params.id //ojo es un string 
         const result = this.ProductManager.getProductsById(id)
         res.sendSuccess(result);  
      } catch (error) {
         res.sendServerError(error.message);
      }
   
   
   }

   async deleteProduct(req, res) {
      try {
         let id = req.params.id
         const result = await this.ProductManager.deleteProduct(id);
         res.sendSuccess(result); 
      } catch (error) {
         res.sendServerError(error.message);
      }
   
   }

   async updatedProducts(req, res) {
      try {
         const {title, description, code, price, status, stock, category, thumbnail} = req.body
         const {id} = req.params;
   
         if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
            return res.sendClientError('incomplete values');
         }

         const result = await this.ProductManager.updatedProducts(id,{
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
         });
   
         res.sendSuccess(result); 
   
      } catch (error) {
         res.sendServerError(error.message);
      }  
   
   }

}


////////////////////
//////////////

// const productRouter = Router()
// const ProductManager = new Products();

// productRouter.get("/", async (req, res) => {
//    try {
//       let { limit, page, sort, query, queryValue } = req.query;
      
//       console.log(req.query);

//       const search = await ProductManager.getProductsByQuery({
//             limit,
//             page,
//             sort,
//             query,
//             queryValue
//       });

//       res.send({status: 'success', payload: search});

//    } catch (error) {
//       res.status(500).send({status: 'error', message: error.message});
//    }   

// });

// productRouter.post("/", async (req, res) => {

//    try {
//       const {title, description, code, price, status, stock, category, thumbnail} = req.body
   
//    if (!title || !description || !code || !price || !status || !category || !thumbnail) {
//       return res.status(400).send({ status: "error", error: "Incomplete values" });
//    }

//    const result = await ProductManager.writeProducts({
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnail
//    });

//    res.status(201).send({status: 'success', payload: result});

//    } catch (error) {
//       res.status(500).send({status: 'error', message: error.message});
//    }

// });


// productRouter.get("/:id", async (req, res) => {
//    try {
//       let id = req.params.id //ojo es un string 
//       res.send(await ProductManager.getProductsById(id))
//    } catch (error) {
//       res.status(500).send({status: 'error', message: error.message});
//    }


// })

// productRouter.delete("/:id", async (req, res) => {
//    try {
//       let id = req.params.id
//       res.send(await ProductManager.deleteProduct(id))
//    } catch (error) {
//       res.status(500).send({status: 'error', message: error.message});
//    }

// })



// productRouter.put("/:id", async (req, res) => {
//    try {
//       const {title, description, code, price, status, stock, category, thumbnail} = req.body
//       const {id} = req.params;

//       if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
//          return res.status(400).send({ status: "error", error: "Incomplete values" });
//       }

//       const result = await ProductManager.updatedProducts(id,{
//          title,
//          description,
//          code,
//          price,
//          status,
//          stock,
//          category,
//          thumbnail
//       });

//       res.send({status: 'success', payload: result});

//    } catch (error) {
//       res.status(500).send({ status: 'error', message: error.message });
//    }


// })


// export default productRouter;