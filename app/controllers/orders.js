var Orders = require('../models/orders');

exports.getList = function (req, res) {

    var opt = req.body.opt;

    Orders.getOrdersList(req.db, opt)
        .then(function (rows) {
            res.send({
                ok: true,
                rows: rows
            });
        }, function (err) {
            console.log(err);
            res.send({
                ok: false,
                msg: err
            });
        });
};

exports.getDetail = function (req, res) {

    var id = req.body.id;
    var orders = {};

    var promise = Orders.getDetail(req.db, id);

    promise.then(function (o) {
        orders.detail = o;
        return Orders.getProducts(req.db, id);
    })
        .then(function (products) {
            orders.products = products;
            res.send({
                ok: true,
                orders: orders.detail,
                products: orders.products
            });
        }, function (err) {
            console.log(err);
            res.send({
                ok: false,
                msg: err
            });
        });

};

exports.getLots = function (req, res) {

    var code = req.body.code;

    Orders.getLots(req.db, code)
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