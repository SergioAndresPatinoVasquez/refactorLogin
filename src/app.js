import express from 'express';
import handlebars from 'express-handlebars';
import initializePassport from './config/passport.config.js'; 
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import passport from 'passport';
import ViewsRouter from './routes/views.routes.js'
import UsersRouter from './routes/users.routes.js'
import CartsRouter from './routes/carts.routes.js'
import ProductsRouter from './routes/product.routes.js';


const app = express();

const viewsRouter = new ViewsRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();

initializePassport();
app.use(passport.initialize());


app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/", viewsRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
app.use("/api/users", usersRouter.getRouter());

try {
    await mongoose.connect('mongodb+srv://sergioandres98:seryus1984@mongodb101.2xndcrf.mongodb.net/segundaPractica?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)
}

app.listen(8080, () => console.log('Server running'));
