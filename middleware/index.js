var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var tokenData = require('../helpers/tokenData');
var cookieParser = require('cookie-parser');

module.exports = function (app) {

  var dbToken = tokenData.tokens.Sesstoken;
  var secretToken = tokenData.tokens.Sesssecrettoken;
  
  app.use(session({ 
    secret: secretToken, 
    cookie: {maxAge: 600000},
    saveUninitialized: true,
    resave: true,
    key: 'session',
    store: new MongoStore({
      url: dbToken 
    })
  }));
  
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  
  var sess;


  // expose session to views
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    sess = req.session;
    sess.user = req.body.email;
    next();
  });
};