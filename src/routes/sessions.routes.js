
import { Router } from 'express';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();


router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register'}), async (req,res)=>{
    res.status(201).send({status: 'success', message: 'user register'});
});

router.get('/fail-register', async (req,res) =>{
    res.send({status: 'error', message: 'register fail'});
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/fail-login'}), async (req, res) => {

        if(!req.user){
            return res.status(401).send({status: 'error', message:'invalid credentials'})
        }

        req.session.user = {
            name: req.user.name || `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }


        if(req.user.email === 'adminCoder@coder.com' && isValidPassword('adminCod3r123', req.user.password)){
         
            req.session.user = {   
                name: `${req.user.first_name} ${req.user.last_name}`,
                email: req.user.email,
                age: req.user.age,
                role : 'admin' 
            }
        }
        res.send({ status: 'success', message: 'login success' })
 
});

router.get('/fail-login', async (req,res) =>{
    res.send({status: 'error', message: 'login fail'});
});



router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) =>{
    res.send({status : 'success', message: 'user registered'})
});

router.get('/github-callback', passport.authenticate('github', {failureRedirect: '/login'}), async(req,res) =>{

    const email = req.user.email || (req.user._json && req.user._json.email) || '';
    const name = (req.user._json && req.user._json.name) || (req.user.displayName || req.user.username) || req.user.first_name || '';
    
    const userObject = {
        name,
        email,
        age: 18,
        role: 'usuario'
    };

    req.session.user = userObject;
    res.redirect('/products');
})



router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message });
        res.redirect('/');
    })
})

export default router;






