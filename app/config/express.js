var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
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
    
    // Error handlerer
    app.use(function (err, req, res, next) {
        console.error(err.strack);
        res.send(500, 'Server error!');
    });
};