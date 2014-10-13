var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, routes = require('./routes')
, bodyParser = require('body-parser')


var app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', index.index);

app.listen(8080);
console.log("Started on 8080");
