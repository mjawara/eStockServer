var Clients = require('../models/clients'),
    moment = require('moment');

exports.doSave = function(req, res) {

    var db = req.db;
    var client = req.body.client;

    var data = {};
    data.hospcode = client.hospcode;
    data.hospname = client.hospname;
    data.private_key = client.privatekey;
    data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');

    Clients.checkDuplicate(db, data.hospcode)
        .then(function(resp) {
            if (resp) {
                res.send({
                    ok: false,
                    msg: "มีข้อมูลอยู่ในระบบแล้ว กรุณาตรวจสอบ"
                });
            } else {
                Clients.doSave(db, data)
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
            }
        }, function(err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};

exports.getList = function(req, res) {

    var db = req.db;

    Clients.getList(db)
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
        })

};

exports.active = function (req, res) {

    var db = req.db;
    var id = req.body.id;
    var status = req.body.status;

    Clients.active(db, id, status)
    .then(function () {
        res.send({ok: true});
    }, function (err) {
        res.send({ok: false, msg: err});
    });
};
