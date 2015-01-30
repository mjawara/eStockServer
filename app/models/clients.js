var Q = require('q');

exports.doSave = function(db, client) {
    var q = Q.defer();

    db('auth')
        .insert(client)
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.checkDuplicate = function(db, hospcode) {

    var q = Q.defer();

    db('auth')
        .count('* as total')
        .where('hospcode', hospcode)
        .exec(function(err, rows) {
            if (err) q.reject(err);
            else {
                var isDuplicated = rows[0].total > 0 ? true : false;
                q.resolve(isDuplicated);
            }
        });

    return q.promise;
};

exports.getList = function(db) {
    var q = Q.defer();

    db('auth')
        .select()
        .exec(function(err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

exports.active = function(db, id, status) {

    var q = Q.defer();

    db('auth')
        .where('id', id)
        .update({
            is_active: status
        })
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};
