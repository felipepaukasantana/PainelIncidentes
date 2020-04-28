const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://sysdba:sysdba@cluster0-vj7sp.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes/routes'));

app.listen(3333);