const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }); 

const app = express();

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);