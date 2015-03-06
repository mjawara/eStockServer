var Products = require('../models/Products');

exports.getList = function (req, res) {

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

/**
 * Save product
 */
exports.save = function (req, res) {

    var product = {};
    var db = req.db;
    var item = req.body.item;

    product.name = item.name;
    product.code = item.code;
    product.units = item.units;
    product.cost = item.cost;
    product.price = item.price;
    product.stdcode = item.stdcode;
    product.is_active = item.is_active;

    // Check is duplicated
    Products.isDuplicated(db, item.name)
        .then(function (isDuplicated) {
            if (isDuplicated) {
                res.send({
                    ok: false,
                    msg: 'ข้อมูลซ้ำ'
                });
            } else {
                Products.save(db, product)
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
            }
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};

/**
 * Update product
 */
exports.update = function (req, res) {

    var product = {};
    var db = req.db;
    var item = req.body.item;

    product.name = item.name;
    product.code = item.code;
    product.units = item.units;
    product.cost = item.cost;
    product.price = item.price;
    product.stdcode = item.stdcode;
    product.id = item.id;
    product.is_active = item.is_active;

    // Check is duplicated
    Products.isDuplicatedUpdate(db, item.id, item.name)
        .then(function (isDuplicated) {
            if (isDuplicated) {
                res.send({
                    ok: false,
                    msg: 'ข้อมูลซ้ำ'
                });
            } else {
                Products.update(db, product)
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
            }
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};

/**
 * Remove product
 */
exports.remove = function (req, res) {

    var code = req.body.code;
    var db = req.db;

    var promise = Products.isOrdered(db, code);

    promise.then(function (total) {
        if (!total) {
            // remove
            Products.remove(db, code)
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
        } else {
            Products.isPurchased(db, code)
                .then(function (total) {
                    if (!total) {
                        // remove
                        Products.remove(db, code)
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
                    } else {
                        res.send({
                            ok: false,
                            msg: 'รายการนี้ ได้มีการทำรายการ (เบิก, จ่าย) แล้ว ไม่สามารถลบได้'
                        });
                    }
                }, function (err) {
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
