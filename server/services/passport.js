const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile) => {
  console.log('access token', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile:', profile);
}));
