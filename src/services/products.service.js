import Products from '../dao/dbManagers/products.manager.js'

const ProductManager = new Products();


const getAllProducts = async (limit,page,sort,query,queryValue) =>{

   const result = await ProductManager.getProductsByQuery(limit,page,sort,query,queryValue);
   return result;
}

const saveProduct = async (title, description, code, price, status, stock, category, thumbnail) =>{

    const result = await ProductManager.writeProducts(title, description, code, price, status, stock, category, thumbnail);
    return result;
 }

 const getProductsById = async (id) => {

    const result = ProductManager.getProductsById(id);
    return result;
 }


 const deleteProduct = async (id) => {

    const result = ProductManager.deleteProduct(id);
    return result;
 }

 const updatedProducts = async (id, {title, description, code, price, status, stock, category, thumbnail}) =>{
    const result = await ProductManager.updatedProducts(id, {title, description, code, price, status, stock, category, thumbnail});
    return result;
 }
 
export {
    getAllProducts,
    saveProduct,
    getProductsById,
    deleteProduct,
    updatedProducts

}


// async (req, res) => {
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
    
    //       res.sendSuccess(search);   
    //    } catch (error) {
    //       res.sendServerError(error.message);
    //    } 
    // }