var Orders = require('../models/Orders');
var _ = require('lodash');
var Q = require('q');
var Utils = require('../models/Utils');

require('q-foreach')(Q);

exports.getList = function(req, res) {

    var status = req.body.status;

    Orders.getOrdersList(req.db, status)
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

    var orderId = req.body.orderId,
        statusId = req.body.statusId,
        products = req.body.products,
        orderCode, hospcode, orderDate;

    // Get orders detail
    var promise = Orders.getDetail(req.db, orderId);

    promise.then(function (orders) {
        orderCode = orders.orders_code;
        hospcode = orders.hospcode;
        orderDate = orders.orders_date;
    }).then(function () {
        return Orders.updateOrdersApprove(req.db, orderId, statusId);
    }).then(function () {
        Q.forEach(products, function(v) {

            var defer = Q.defer();

            Orders.saveItemApprove(req.db, orderId, v.code, v.qty, v.lot)
                .then(function() {
                    // Set item
                    var item = {};
                    item.code = orderCode;
                    item.hospcode = hospcode;
                    item.purchase_date = orderDate;
                    item.product_code = v.code; // Product code
                    item.qty = v.qty;
                    //Update stock card
                    Orders.doImport(req.db, item).then(function () {
                        // Success
                        defer.resolve();
                    }, function (err) {
                        defer.reject(err);
                    });

                }, function(err) {
                    defer.reject(err);
                });

            return defer.promise;

        }).then(function() {
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

/**
 * Client api
 */
exports.getOnlineStatus = function (req, res) {
    var db = req.db;
    var hospcode = req.body.hospcode;
    var key = req.body.key;

    var promise = Utils.checkAuth(db, hospcode, key);

    promise.then(function (isOk) {
        if (isOk) {
            // Get orders
            Orders.getOnlineStatus(db, hospcode)
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

        } else {
            res.send({
                ok: false,
                msg: 'Authentication failed.'
            });
        }
    }, function (err) {
        res.send({
            ok: false,
            msg: err
        });
    });
};
/**
 * Get orders status list
 */
exports.getOrderStatusList = function (req, res) {

    Orders.getOrderStatusList(req.db)
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
/**
 * Save orders online
 *
 * @param req
 * @param res
 */
exports.saveOrdersOnline = function(req, res) {
    var hospcode = req.body.hospcode,
        key = req.body.key,
        orders = req.body.orders;

    var promise = Utils.checkAuth(req.db, hospcode, key);

    promise.then(function(isOk) {
        if (isOk) {
            // Do save order
            var promise = Orders.saveOrdersOnline(req.db, hospcode, orders);

            promise.then(function(orderId) {
                var items = [];

                _.forEach(orders.items, function(v) {
                    var obj = {};
                    obj.orders_id = orderId;
                    obj.product_code = v.code;
                    obj.qty = v.qty;

                    items.push(obj);
                });

                return Orders.saveOrdersOnlineDetail(req.db, items);

            }).then(function() {
                res.send({
                    ok: true
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

/**
 * Get Orders detail
 */
exports.getOnlineDetail = function (req, res) {
    var hospcode = req.body.hospcode,
        key = req.body.key,
        id = req.body.id;

    var promise = Utils.checkAuth(req.db, hospcode, key);

    promise.then(function (isOk) {
        if (isOk) {
            Orders.getOnlineDetail(req.db, id)
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
        } else {
            res.send({
                ok: false,
                msg: 'Authentication failed.'
            });
        }
    }, function (err) {
        res.send({
            ok: false,
            msg: err
        });
    });
};
