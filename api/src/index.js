const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes/routes'));

app.listen(3333);