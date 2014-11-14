var adminCheck = require('../middleware/adminCheck');
var errors = require('./errors')
,   login = require('./login')
,   mongoose = require('mongoose');
var layoutData = mongoose.model('layoutData');

module.exports = function(app) {
    //console.log(app);
    app.get('/admin', adminCheck, function (req, res, next) {
        layoutData.find({_id : "admin"}, function (err, layoutData) {
            if (err) return next(err);
            //console.log(layoutData);
            var layout = layoutData;
            //console.log(layout);
            console.log(req.session);
            res.render('admin.jade', {layout: layout});
        });
    });

    
    //Login and Logout Routes
    login(app);
    
    //error handlers
    errors(app);
    
};