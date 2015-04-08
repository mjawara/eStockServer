var Reports = require('../models/Reports');

exports.getTopTen = function (req, res) {

    Reports.getTopTen(req.db, req.session.startYear, req.session.endYear)
        .then(function (data) {
            res.send({ok: true, rows: data});
        }, function (err) {
            res.send({ok: false, msg: err});
        });
};