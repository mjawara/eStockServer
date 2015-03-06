var Products = require('../models/products'),
    Orders = require('../models/orders'),
    Utils = require('../models/utils'),
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

    var hospcode = req.query.hospcode;
    var key = req.query.key;

    var promise = Utils.checkAuth(req.db, hospcode, key);

    promise.then(function(isOk) {
        if (isOk) {
            Products.getProductList(req.db)
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