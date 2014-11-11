var mongoose = require('mongoose');
var User = mongoose.model('User');
var layoutData = mongoose.model('layoutData');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');
//var createdDate = require('../plugins/createdDate');

module.exports = function(app) {
    
    app.get('/signup', function (req, res) {
        res.render('signup.jade');
    });
    
    app.post('/signup', function (req, res, next) {
        var email = cleanString(req.param('email'));
        var pass = cleanString(req.param('pass'));
        var isAdmin = req.param('admin');
        if (!(email && pass)) {
            return invalid();
        }
        User.findById(email, function (err, user) {
        if (err) return next(err);
        
        if (user) {
            return res.render('signup.jade', {exists: true });
        }
        
        crypto.randomBytes(16, function (err, bytes) {
            if (err) return next(err);
            
            var user = {_id: email };
            user.salt = bytes.toString('utf8');
            user.hash = hash(pass, user.salt);
            user.admin = isAdmin;
            
            User.create(user, function (err, newUser) {
                if (err) {
                    if (err instanceof mongoose.Error.ValidationError) {
                        return invalid();
                    }
                    return next(err);
                }
                
                req.session.isLoggedIn = true;
                req.session.user = email;
                req.session.priv = isAdmin;
                console.log('created user: %s', email);
                return res.redirect('/');
            });
        });
    });
    
    function invalid () {
        return res.render('signup.jade', {invalid: true});
    }
});
    
    
    
    app.get('/login', function (req, res, next) {
        layoutData.find({}, function (err, layoutData) {
            if (err) return next(err);
            var layout = layoutData;
            res.render('login.jade', {layout: layout});
        });
    });
    
    app.post('/login', function (req, res, next) {
        //validate input
        var email = cleanString(req.param('email'));
        var pass = cleanString(req.param('pass'));
        // console.log(email);
        // console.log(pass);
        // console.log(admin);
        if (!(email && pass)) {
            return invalid();
        }
        email = email.toLowerCase();
        
        User.findById(email, function (err, user) {
            if (err) return next(err);
            if (!user) {
                return invalid();
            }
            console.log(user);
            
            if (user.hash != hash(pass, user.salt)) {
                return invalid();
            }
            console.log(email);
            var isAdmin = user.admin;
            req.session.isLoggedIn = true;
            req.session.usr = email ;
            req.session.priv = isAdmin;
            res.redirect('/');
            });
            
            var invalid = function () {
                res.render('signup.jade', {invalid: true});
            };
        });
    app.get('/logout', function (req, res) {
        req.session.isLoggedIn = false;
        req.session.usr = null;
        req.session.priv = null;
        res.redirect('/');
    });
};