var Q = require('q');

exports.getProductList = function (db) {
    var q = Q.defer();

    db('products')
        .select('*')
        .orderBy('name', 'asc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

/**
 * Save product
 */
exports.save = function (db, item) {

    var q = Q.defer();

    db('products')
        .insert(item)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Check duplicated
 */
exports.isDuplicated = function (db, name) {

    var q = Q.defer();

    db('products')
        .where('name', name)
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