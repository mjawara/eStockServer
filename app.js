var express = require('express'),

    app = express(),
    config = require('./app/config/Config');

var db = require('knex')(config.db);

var auth = function (req, res, next) {
    if (req.session.username) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
};

app.use(function (req, res, next) {
    req.db = db;
    next();
});

require('./app/config/Express')(app, config);
require('./app/config/Routes')(app, auth);

var server = app.listen(config.port, function () {
    console.log('Listening on port %d', server.address().port);
});
