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

app.listen(8080);
console.log("Started on 8080");