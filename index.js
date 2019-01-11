// basic express server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// Route
require('./route/mailRoute')(app); 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
process.setMaxListeners(0);
