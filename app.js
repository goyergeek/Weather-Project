var mongoose = require('mongoose')
,   express = require('express')
,   bodyParser = require('body-parser');


require('express-mongoose');

var models = require('./models')
,   routes = require('./routes')
,   middleware = require('./middleware');
var tokenData = require('./helpers/tokenData');

var token = (tokenData.tokens.WPtoken);
mongoose.connect(token, function (err) {
    if (err) throw err;
    var app = express();
    
    app.set('views', __dirname+'/views');
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('public'));
    
    app.get('/public/*', function(req, res) {
        res.sendFile(__dirname + req.url);
    });
    
    middleware(app);
    routes(app);
    
    app.listen(process.env.PORT || 8080);
	console.log("Started on "+process.env.PORT);
});