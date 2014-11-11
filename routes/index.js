var errors = require('./errors')
,   login = require('./login')
,   mongoose = require('mongoose');
var layoutData = mongoose.model('layoutData');

module.exports = function(app) {
    
    app.get('/', function (req, res, next) {
        layoutData.find({}, function (err, layoutData) {
            if (err) return next(err);
            //console.log(layoutData);
            var layout = layoutData;
            console.log(layout);
            res.render('home.jade', {layout: layout});
        });
    });
    
    //Login and Logout Routes
    login(app);
    
    //error handlers
    errors(app);
    
};