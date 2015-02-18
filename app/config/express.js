var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    methodOverride = require('method-override');

module.exports = function (app, config) {
    app.set('views', path.join(config.rootPath, 'app/views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(config.rootPath, 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(methodOverride());
    app.use(session({
        secret: 'MySeCrETkEy',
        resave: false,
        saveUninitialized: true,
        secure: true
    }));

};