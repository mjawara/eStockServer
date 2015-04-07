var Q = require('q'),
    md5 = require('MD5');

exports.doAuth = function (db, username, password) {

    var q = Q.defer();

    db('users')
        .select('*')
        .where('username', username)
        .where('password', md5(password))
        .exec(function (err, rows) {
            console.log(rows[0]);
            if (err) q.reject(err);
            else  q.resolve(rows[0]);
        });

    return q.promise;
};
