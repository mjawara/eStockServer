/**
 * Purchase model
 */

var Purchases = require('../models/purchases.js'),
    _ = require('lodash');
var Q = require('q');

require('q-foreach')(Q);

exports.doSave = function (req, res) {
    var db = req.db,
        purchase = req.body.purchase,
        drugs = req.body.drugs;

    Purchases.savePurchase(db, purchase)
        .then(function (id) {

            var items = [];

            _.forEach(drugs, function (v) {
                var obj = {};
                obj.purchase_id = id;
                obj.product_code = v.code;
                obj.qty = v.qty;

                items.push(obj);
            });

            Purchases.savePurchaseDetail(db, items)
                .then(function () {
                    res.send({
                        ok: true
                    });
                }, function (err) {
                    res.send({
                        ok: false,
                        msg: err
                    });
                });

        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });
};

/**
 * Get purchase list
 */
exports.getList = function (req, res) {
    var db = req.db;

    Purchases.getList(db)
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
 * Get purchase for edit
 */

exports.detail = function (req, res) {

    var db = req.db;
    var id = req.body.id;

    var _purchase = null;

    Purchases.getPurchaseDetail(db, id)
        .then(function (purchase) {
            _purchase = purchase;
            return Purchases.getProducts(db, id);
        })
        .then(function (drugs) {
            res.send({
                ok: true,
                drugs: drugs,
                purchase: _purchase
            });
        }, function (err) {
            console.log(err);
            res.send({
                ok: false,
                msg: err
            });
        });
};

/**
 * Update purchase
 */
exports.update = function (req, res) {
    var db = req.db;
    var purchase = req.body.purchase;
    var drugs = req.body.drugs;

    // Update purchase
    Purchases.updatePurchase(db, purchase)
        .then(function () {
            // remove old product data
            return Purchases.removeOldProducts(db, purchase.purchase_id);
        }).then(function () {
            // add new products
            return Purchases.savePurchaseDetail(db, drugs);
        }).then(function () {
                res.send({
                    ok: true
                });
            },
            function (err) {
                console.log(err);
                res.send({
                    ok: false,
                    msg: err
                });
            });
};
/**
 * Remove purchase
 */
exports.remove = function (req, res) {

    var db = req.db;
    var id = req.body.id;

    console.log(id);
    
    Purchases.removePurchase(db, id)
        .then(function () {
            return Purchases.removeOldProducts(db, id);
        }).then(function () {
            res.send({
                ok: true
            });
        }, function (err) {
            console.log(err);
            res.send({
                ok: false,
                msg: err
            });
        });
};
