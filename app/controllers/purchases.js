/**
 * Purchase model
 */

var Purchases = require('../models/Purchases'),
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

/**
 * Import data
 */
exports.import = function (req, res) {
    var db = req.db;
    var id = req.body.id;
    // Get purchase detail
    Purchases.checkImported(db, id)
        .then(function (isImported) {
            if (isImported) {
                res.send({
                    ok: false,
                    msg: 'รายการนี้ถูกนำเข้าไปแล้ว ไม่สามารถนำเข้าได้อีก'
                });
            } else {
                var promise = Purchases.getImportData(db, id);

                promise.then(function (data) {

                    Q.forEach(data, function (v) {
                        var defer = Q.defer();

                        Purchases.doImport(db, v)
                            .then(function () {
                                // Success
                                defer.resolve();
                            }, function (err) {
                                console.log(err);
                                defer.reject(err);
                            });

                        return defer.promise;

                    }).then(function (resolve) {
                        Purchases.changeImportStatus(db, id)
                            .then(function () {
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

                    });

                }, function (err) {

                    console.log(err);
                    res.send({
                        ok: false,
                        msg: err
                    });

                });
            }
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};
