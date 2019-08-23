const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record
        new User({ googleId: profile.id }).save()
          .then(user => done(null, user));
      }
    });
}));
