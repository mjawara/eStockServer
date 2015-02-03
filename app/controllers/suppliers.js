var Suppliers = require('../models/suppliers'),
    Q = require('q'),
    moment = require('moment');

exports.doSave = function (req, res) {

    var db = req.db;
    var data = req.body.data;

    var items = {};

    items.name = data.name;
    items.contact_name = data.contact_name;
    items.address = data.address;
    items.telephone = data.telephone;
    items.fax = data.fax;
    items.created_at = moment().format('YYYY-MM-DD HH:mm:ss');

    Suppliers.checkDuplicated(db, items.name)
        .then(function (resp) {
            if (resp) {
                res.send({
                    ok: false,
                    msg: 'รายการซ้ำ : มีรายการนี้อยู่แล้วในฐานข้อมูล'
                });
            } else {
                // Do save
                Suppliers.doSave(db, items)
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

exports.getList = function (req, res) {

    Suppliers.getList(req.db)
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

exports.detail = function (req, res) {
    var db = req.db;
    var id = req.body.id;

    Suppliers.detail(db, id)
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

exports.doUpdate = function (req, res) {

    var db = req.db;
    var supplier = req.body.supplier;

    Suppliers.checkDuplicatedUpdate(db, supplier.id, supplier.name)
        .then(function (resp) {
            if (resp) {
                res.send({
                    ok: false,
                    msg: 'รายการซ้ำ : มีรายการนี้อยู่แล้วในฐานข้อมูล'
                });
            } else {
                Suppliers.doUpdate(db, supplier)
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

exports.doRemove = function (req, res) {
    var db = req.db;
    var id = req.body.id;

    Suppliers.doRemove(db, id)
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
};
