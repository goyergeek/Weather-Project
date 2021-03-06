var errors = require('./errors')
,   login = require('./login')
,   mongoose = require('mongoose')
,   admin = require('./admin');
var layoutData = mongoose.model('layoutData');

module.exports = function(app) {
    //console.log(app);
    app.get('/', function (req, res, next) {
        layoutData.find({_id: "home"}, function (err, layoutData) {
            if (err) return next(err);
            //console.log(layoutData);
            var layout = layoutData;
            //console.log(layout);
            console.log(req.session);
            res.render('home.jade', {layout: layout});
        });
    });
    
    //Login and Logout Routes
    login(app);
    
    //Admin routes
    admin(app);
    
    //error handlers
    errors(app);
    
};