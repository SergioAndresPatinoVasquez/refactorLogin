import express from "express";
import sessionsRouter from './routes/sessions.routes.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import {__dirname} from "./utils.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";


const app = express();

try {
    await mongoose.connect('mongodb+srv://sergioandres98:seryus1984@mongodb101.2xndcrf.mongodb.net/refactorLogin?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder5575Secret',
    resave: true, //nos sirve para poder refrescar o actualizar la sesión luego de un de inactivadad
    saveUninitialized: true, //nos sirve para desactivar el almacenamiento de la session si el usuario aún no se ha identificado o aún no a iniciado sesión
    // cookie: {
    //     maxAge: 30000
    // }
}));

//passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

const server = app.listen(8080, ()=>{
    console.log("Servidor express en puerto 8080");
});

