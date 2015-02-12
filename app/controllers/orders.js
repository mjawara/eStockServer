var Orders = require('../models/orders');
var _ = require('lodash');
var Q = require('q');

require('q-foreach')(Q);

exports.getList = function(req, res) {

    var opt = req.body.opt;

    Orders.getOrdersList(req.db, opt)
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
};

exports.getDetail = function(req, res) {

    var id = req.body.id;
    var orders = {};

    var promise = Orders.getDetail(req.db, id);

    promise.then(function(o) {
            orders.detail = o;
            return Orders.getProducts(req.db, id);
        })
        .then(function(products) {
            orders.products = products;
            res.send({
                ok: true,
                orders: orders.detail,
                products: orders.products
            });
        }, function(err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};

exports.getLots = function(req, res) {

    var code = req.body.code;

    Orders.getLots(req.db, code)
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
};

exports.saveApprove = function(req, res) {
    var orderId = req.body.order_id;
    var products = req.body.products;

    //products = JSON.parse(products);

    Orders.updateOrdersApprove(req.db, orderId)
        .then(function() {
            Q.forEach(products, function(v) {
                    //console.log(v.code);
                    var defer = Q.defer();

                    Orders.saveItemApprove(req.db, orderId, v.code, v.qty, v.lot)
                        .then(function() {
                            defer.resolve();
                        }, function(err) {
                            defer.reject(err);
                        });

                    return defer.promise;

                })
                .then(function() {
                    res.send({
                        ok: true
                    });
                });

        }, function(err) {
            res.send({
                ok: false,
                msg: err
            });
        });

    // do save approve data
};

exports.doCancel = function(req, res) {
    var orderId = req.body.order_id;

    Orders.doCancel(req.db, orderId)
        .then(function() {
            res.send({
                ok: true
            });
        }, function(err) {
            res.send({
                ok: false,
                msg: err
            });
        });
};
