
import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils.js';

const githubRouter = Router();


githubRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) =>{
    
    res.send({status : 'success', message: 'user registered'})
});

githubRouter.get('/github-callback', passport.authenticate('github', {failureRedirect: '/login'}), async(req,res) =>{
 try {
    const email = req.user.email || (req.user._json && req.user._json.email) || '';
    const name = (req.user._json && req.user._json.name) || (req.user.displayName || req.user.username) || req.user.first_name || '';
    
    const userObject = {
        name,
        email,
        age: 18,
        role: 'USER'
    };

    console.log("github1")
    req.session.user = userObject;

    const accessToken = generateToken(userObject);
    console.log("Token login", accessToken)
    res.cookie('coderCookieToken', accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true}).send({status:'success', message:'login success'})
    
    //res.redirect('/products');
    //si descomento esta linea me aparece este error
//     ErrorCaptureStackTrace(err);
//     ^

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at new NodeError (node:internal/errors:406:5)
//     at ServerResponse.setHeader (node:_http_outgoing:652:11)
//     at ServerResponse.header 


 } catch (error) {
    console.error('Error en /github-callback:', error);
        // Envía una respuesta de error al cliente
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
 }

})



githubRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', message: error.message });
        res.redirect('/login');
    })
})

export default githubRouter;






