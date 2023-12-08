import { Router as expressRouter } from 'express';
import passport from 'passport';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    get(path, policies, strategy, ...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, strategy, ...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, strategy, ...callbacks) {
        this.router.put(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, strategy, ...callbacks) {
        this.router.delete(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        };

        res.sendSuccessNewResourse = (data) => {
            res.status(201).json({ data });
        };

        res.sendServerError = (error) => {
            res.status(500).json( { error } )
        };

        res.sendClientError = (error) => {
            res.status(400).json({ error });
        };

        next();
    }

    applyCustomPassportCall = (strategy) => (req, res, next) => {
        if (strategy === passportStrategiesEnum.JWT) {
            //custom passport call
            console.log("entro er")
            console.log("la estrategias es", strategy)
            passport.authenticate(strategy, function (err, user, info) {
                if(err) return next(err);

                if(!user) {
                    return res.status(401).send({
                        error: info.messages ? info.messages : info.toString()
                    })
                }

                req.user = user;
                next();
            })(req, res, next);
        } else {
            next();
        }
    }

    handlePolicies = (policies) => (req, res, next) => {
        if (policies[0] === accessRolesEnum.PUBLIC) return next();
        // console.log("policies", policies);
        // console.log("policies", policies[0]);
        const user = req.user;
        // console.log("user", user)
        // console.log("user role", user.role)
        // console.log("policies . incluede user role uppercas", policies.includes(user.role.toUpperCase()))
    
        if (!user || !user.role || !policies.includes(user.role.toUpperCase())) {
            return res.status(403).json({ error: 'not permissions compa' });
        }
    
        next();
    }

    applyCallbacks(callbacks) {
        //mapear los callbacks 1 a 1, obteniedo sus parámetros (req, res)
        return callbacks.map((callback) => async (...params) => {
            try {
                //apply, va a ajecuttar la función callback, a la instancia de nuestra clase que es el router
                await callback.apply(this, params);
            } catch (error) {
                params[1].status(500).json({ status: 'error', message: error.message })
            }
        }) //[req, res]
    }
}