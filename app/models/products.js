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
 * Update product
 *
 * @param db
 * @param item
 * @returns {*}
 */
exports.update = function (db, item) {

    var q = Q.defer();

    db('products')
        .update({
            code: item.code,
            name: item.name,
            units: item.units,
            price: item.price,
            cost: item.cost,
            stdcode: item.stdcode,
            is_active: item.is_active
        })
        .where('id', item.id)
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
/**
 * Check duplicated for update
 */
exports.isDuplicatedUpdate = function (db, id, name) {

    var q = Q.defer();

    db('products')
        .where('name', name)
        .where('id', '!=', id)
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
/**
 * Remove product
 */
exports.remove = function (db, code) {

    var q = Q.defer();

    db('products')
        .where('code', code)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Check product has been order
 */
exports.isOrdered = function (db, code) {
    var q = Q.defer();

    db('orders_detail as d')
        .where('d.product_code', code)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else  q.resolve(rows[0].total);
        });

    return q.promise;
};

exports.isPurchased = function (db, code) {
    var q = Q.defer();

    db('purchases_detail as p')
        .where('p.product_code', code)
        .count('* as total')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else  q.resolve(rows[0].total);
        });

    return q.promise;
};