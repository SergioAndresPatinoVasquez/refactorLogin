
import { Router } from 'express';
import passport from 'passport';

const githubRouter = Router();


githubRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) =>{
    res.send({status : 'success', message: 'user registered'})
});

githubRouter.get('/github-callback', passport.authenticate('github', {failureRedirect: '/login'}), async(req,res) =>{

    const email = req.user.email || (req.user._json && req.user._json.email) || '';
    const name = (req.user._json && req.user._json.name) || (req.user.displayName || req.user.username) || req.user.first_name || '';
    
    const userObject = {
        name,
        email,
        age: 18,
        role: 'usuario'
    };

    console.log("github1")
    req.session.user = userObject;
    res.redirect('/products');
})



githubRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message });
        res.redirect('/');
    })
})

export default githubRouter;






