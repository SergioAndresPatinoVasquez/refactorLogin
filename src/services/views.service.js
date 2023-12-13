
import Carts from '../dao/dbManagers/carts.manager.js';
import { cartsModel } from '../dao/dbManagers/models/carts.model.js';
import { productsModel } from '../dao/dbManagers/models/products.model.js';

const cartsManager = new Carts();

const productsView = async (page, limit) => {

        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsModel.paginate({}, {page, limit, lean:true});
        return {docs, hasPrevPage, hasNextPage, nextPage, prevPage};

}

const cartsView = async () => {
        const carts = await cartsManager.readCarts();
        return carts;
}

const cartsIdView = async  (cartId) =>{
        const cart = await cartsModel.findById(cartId).lean();
        return cart;

}

export {
    cartsView,
    cartsIdView,
    productsView

}