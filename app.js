var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, getData = require('./routes/getData.js').getData
, bodyParser = require('body-parser');


var app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static('public'));

app.get('/', index.index);

app.post('/getData', function(req, res){
	var dataTypeData = req.body;
	getData(dataTypeData, function(data){
		res.send(data);
	});
});

app.get('/public/*', function(req, res){
  res.sendFile(__dirname + req.url);
});

app.get("*", function(req, res) {
	res.status(404).send("404 baby.");
});

app.listen(process.env.PORT || 8080);
console.log("Started on "+process.env.PORT);
