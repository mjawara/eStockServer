var Q = require('q'),
    moment = require('moment');

exports.doSave = function (db, data) {

    var q = Q.defer();

    db('suppliers')
        .insert(data)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};

exports.checkDuplicated = function (db, name) {

    var q = Q.defer();

    db('suppliers')
        .where('name', name)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                if (rows[0].total > 0) {
                    q.resolve(true);
                } else {
                    q.resolve(false);
                }
            }
        });

    return q.promise;
};

exports.getList = function (db) {

    var q = Q.defer();

    db('suppliers')
        .orderBy('name', 'desc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

exports.detail = function (db, id) {

    var q = Q.defer();

    db('suppliers')
        .where('id', id)
        .limit(1)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};

exports.doUpdate = function (db, supplier) {

    var q = Q.defer();

    db('suppliers')
        .where('id', supplier.id)
        .update({
            name: supplier.name,
            contact_name: supplier.contact_name,
            address: supplier.address,
            telephone: supplier.telephone,
            fax: supplier.fax,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};

exports.checkDuplicatedUpdate = function (db, id, name) {

    var q = Q.defer();

    db('suppliers')
        .where('name', name)
        .where('id', '!=', id)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                if (rows[0].total > 0) {
                    q.resolve(true);
                } else {
                    q.resolve(false);
                }
            }
        });

    return q.promise;
};

exports.doRemove = function (db, id) {
    var q = Q.defer();

    db('suppliers')
        .where('id', id)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};
