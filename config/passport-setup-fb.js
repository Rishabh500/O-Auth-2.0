const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){ 
  passport.use(new FacebookStrategy({
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.secret,
    callbackURL: keys.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const newUser = {
                    googleId: profile.id,
                    userName: profile.displayName
                  }
              
              
                User.findOne({
                    googleId: profile.id
                  }).then(user => {
                    if(user){
                      // Return user
                      console.log('User Exists');
                      done(null, user);
                      
                    } else {
                      // Create user
                      new User(newUser)
                      .save()
                      .then(user => done(null, user));              
                    }
                  });
  }
  ));
  
  passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser((id, done) => {
      User.findById(id).then(user => done(null, user));
    });
  }