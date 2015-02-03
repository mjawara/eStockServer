var Q = require('q'),
    Products = require('../models/products');

exports.getList = function (req, res) {

    var q = Q.defer();

    Products.getProductList(req.db)
        .then(function (rows) {
            res.send({
                ok: true,
                rows: rows
            });
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};
