const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

dotenv.config();

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }); 

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);