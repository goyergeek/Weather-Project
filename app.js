var express = require('express')
, path = require('path')
, mongoose = require('mongoose')
, routes = require('./routes')
, bodyParser = require('body-parser')
,	models = require('./models');
require('express-mongoose');
//, locations = mongoose.model('locations');

mongoose.connect('mongodb://your.host.here/Weather-Project', function (err) {
	if (err) throw err;
	
	var app = express();
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(express.static('public'));
	app.get('/public/*', function(req, res){
	  res.sendFile(__dirname + req.url);
	});
	routes(app);
	app.get("*", function(req, res) {
		res.status(404).send("404 baby.");
	});

	app.listen(process.env.PORT || 8080);
	console.log("Started on "+process.env.PORT);
});

// var app = express();



// app.get('/', index.index);

// app.post('/getData', function(req, res){
// 	var dataTypeData = req.body;
// 	getData.getData(dataTypeData, function(data){
// 		res.send(data);
// 	});
// });




