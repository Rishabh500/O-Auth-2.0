const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const profileRoutes = require('./routes/profile-routes');

//Use passport JS
require('./config/passport-setup-fb')(passport);
require('./config/passport-setup')(passport);



// View Engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge:24 * 60 * 60 * 1000,
    keys: ['welcometooauth']
}));

//Connect Mongoose DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Setup static folder
app.use(express.static(path.join(__dirname, 'public')));
//Use Auth Router
app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);

app.get('/', (req,res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('App Server Started');
});