const express = require('express');
const router = express.Router();
const passport = require('passport');

//Auth Login
router.get("/login", (req,res) => {
    res.render('login');
});

//Auth Google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//Auth Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
//   res.send(req.user);
res.redirect('/profile/');
});

router.get('/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/profile/',
                                    failureRedirect: '/' }));


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
   });

module.exports = router;