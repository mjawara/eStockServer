var Q = require('q');

exports.getTopTen = function (db, startDate, endDate) {
    var q = Q.defer();

    var sql = 'select p.name, p.code, sum(s.qty_in) as totalIn, sum(s.qty_out) as totalOut ' +
        'from stock_cards as s ' +
        'left join products as p on p.code=s.product_code ' +
        'where s.cdate between ? and ? group by s.product_code ' +
        'order by totalIn, totalOut limit 10';
    db.raw(sql, [startDate, endDate])
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};