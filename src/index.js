const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);
require('./controllers/listController')(app);

app.listen(3000, console.log('porta 3000'));
