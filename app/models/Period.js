var Q = require('q');

exports.all = function (db) {

    var q = Q.defer();

    db('periods')
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

    db('periods')
        .insert(year)
        .returning('id')
        .exec(function (err, id) {
            if (err) q.reject(err);
            else q.resolve(id[0]);
        });

    return q.promise;

};

exports.update = function (db, year) {

    var q = Q.defer();

    db('periods')
        .update({
            name: year.name,
            start_date: year.start_date,
            end_date: year.end_date
        })
        .where('id', year.id)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};

exports.remove = function (db, id) {

    var q = Q.defer();

    db('periods')
        .where('id', id)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};
