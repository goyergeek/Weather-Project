var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, routes = require('./routes')
, getData = require('./routes/getData')
, bodyParser = require('body-parser')


var app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', index.index);
app.post('/getData', function(req, res){
	getData.getData(function(data){
		res.send(data);
	});
});

app.get('/public/*', function(req, res){
  res.sendFile(__dirname + req.url);
});

app.get("*", function(req, res) {
	res.send("404 baby.", 404);
});

app.listen(8080);
console.log("Started on 8080");
