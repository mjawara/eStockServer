/**
 * Users controller
 */

var Users = require('../models/Users'),
    md5 = require('MD5');

/**
 * Get all user
 */
exports.all = function (req, res) {
    var db = req.db;

    Users.all(db)
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
 * Save user
 */
exports.save = function (req, res) {
    var db = req.db;
    var data = req.body.items;
    var user = {};

    user.fullname = data.fullname;
    user.username = data.username;
    user.password = md5(data.password);
    user.is_admin = data.isAdmin;
    user.is_active = data.isActive;

    Users.isDuplicated(db, user.username)
        .then(function (resp) {
            if (resp) {
                res.send({
                    ok: false,
                    msg: 'ข้อมูลซ้ำ กรุณาตรวจสอบ'
                });
            } else {
                Users.save(db, user)
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
 * Remove user
 */
exports.remove = function (req, res) {

    var db = req.db;
    var id = req.body.id;

    Users.remove(db, id)
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
/**
 * Update user
 */
exports.update = function (req, res) {

    var db = req.db;
    var user = req.body.user;

    Users.update(db, user)
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
