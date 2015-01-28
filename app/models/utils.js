var Q = require('q');

exports.checkAuth = function (db, hospcode, private_key) {
    var q = Q.defer();

    db('auth')
        .where('hospcode', hospcode)
        .where('private_key', private_key)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                var isOk = rows[0].total > 0 ? true : false;
                q.resolve(isOk);
            }
        });

    return q.promise;
};