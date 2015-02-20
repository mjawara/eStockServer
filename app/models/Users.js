var Q = require('q'),
    moment = require('moment');

exports.all = function (db) {

    var q = Q.defer();

    db('users')
        .orderBy('fullname', 'asc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;

};

exports.save = function (db, user) {

    var q = Q.defer();

    db('users')
        .insert({
            username: user.username,
            fullname: user.fullname,
            password: user.password,
            is_admin: user.is_admin,
            is_active: user.is_active,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.remove = function (db, id) {

    var q = Q.defer();

    db('users')
        .where('id', id)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.update = function (db, user) {

    var q = Q.defer();

    db('users')
        .where('id', user.id)
        .update({
            fullname: user.fullname,
            is_admin: user.isAdmin,
            is_active: user.isActive,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.isDuplicated = function (db, username) {

    var q = Q.defer();

    db('users')
        .where('username', username)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                var isDuplicated = rows[0].total > 0 ? true : false;
                q.resolve(isDuplicated);
            }
        });

    return q.promise;
};

