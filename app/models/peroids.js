var Q = require('q');

exports.all = function (db) {

    var q = Q.defer();

    db('peroids')
        .orderBy('name', 'desc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

exports.get = function (db, id) {};

exports.save = function (db, year) {

    var q = Q.defer();

    db('peroids')
        .insert(year)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};

exports.remove = function (db, id) {

    var q = Q.defer();

    db('peroids')
        .where('id', id)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};
