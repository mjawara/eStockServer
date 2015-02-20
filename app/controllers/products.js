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
