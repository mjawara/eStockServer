var Products = require('../models/Products'),
    Orders = require('../models/Orders'),
    Utils = require('../models/Utils'),
    _ = require('lodash');

exports.index = function(req, res) {

    //res.send('Welcome to eStock server. [' + new Date().toString() + ']');
    res.render('pages/index');

};

/**
 * Get product list
 *
 * @params hospcode
 * @params private_key
 * @return []
 **/

exports.products = function(req, res) {

    var hospcode = req.body.hospcode;
    var key = req.body.key;

    var promise = Utils.checkAuth(req.db, hospcode, key);

    promise.then(function(isOk) {
        if (isOk) {
            Products.getProductListClient(req.db)
                .then(function(rows) {
                    res.send({
                        ok: true,
                        rows: rows
                    });
                }, function(err) {
                    res.send({
                        ok: false,
                        msg: err
                    });
                });
        } else {
            res.send({
                ok: false,
                msg: 'Authentication failed.'
            });
        }
    }, function(err) {
        res.send({
            ok: false,
            msg: err
        });
    });

};