var Q = require('q'),
    md5 = require('MD5');

exports.doAuth = function (db, username, password) {

    var q = Q.defer();

    db('users')
        .where('username', username)
        .where('password', md5(password))
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                var success = rows[0].total > 0 ? true : false;
                q.resolve(success);
            }
        });

    return q.promise;
};
