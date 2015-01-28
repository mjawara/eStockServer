var express = require('express'),
    
    app = express(),
    config = require('./app/config/config');

var db = require('knex')(config.db);

app.use(function (req, res, next) {
    req.db = db;
    next();
});

require('./app/config/express')(app, config);
require('./app/config/routes')(app);

var server = app.listen(config.port, function () {
    console.log('Listening on port %d', server.address().port);
});