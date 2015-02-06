var Q = require('q'),
    moment = require('moment');

exports.savePurchase = function (db, purchase) {
    var q = Q.defer();

    db('purchases')
        .returning('id')
        .insert({
            supplier_id: purchase.supplier,
            contact_name: purchase.contact_name,
            purchase_date: purchase.date,
            code: purchase.code,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err, id) {
            if (err) {
                q.reject(err);
            } else {
                q.resolve(id);
            }
        });

    return q.promise;
};

exports.savePurchaseDetail = function (db, items) {
    var q = Q.defer();

    db('purchases_detail')
        .insert(items)
        .exec(function (err) {
            console.log(err);
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.getList = function (db) {
    var q = Q.defer();

    db('purchases as p')
        .select('p.purchase_date', 'p.code', 'p.contact_name', 'p.id', 'p.is_imported', 's.name as supplier_name')
        .leftJoin('suppliers as s', 's.id', 'p.supplier_id')
        .orderBy('p.purchase_date', 'asc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

/**
 * Get purchase detail
 */

exports.getPurchaseDetail = function (db, id) {
    var q = Q.defer();

    db('purchases as p')
        .select('p.code', 'p.supplier_id', 'p.purchase_date', 's.contact_name', 's.name as supplier_name')
        .leftJoin('suppliers as s', 's.id', 'p.supplier_id')
        .where('p.id', id)
        .limit(1)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};

/**
 * Get products
 */

exports.getProducts = function (db, id) {

    var q = Q.defer();

    db('purchases_detail as d')
        .select('d.*', 'p.code', 'p.units', 'p.cost', 'p.name')
        .leftJoin('products as p', 'p.code', 'd.product_code')
        .where('d.purchase_id', id)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

/**
 * Update purchase detail
 */
exports.updatePurchase = function (db, purchase) {
    var q = Q.defer();

    db('purchases')
        .update({
            supplier_id: purchase.supplier_id,
            contact_name: purchase.contact_name,
            purchase_date: purchase.date,
            code: purchase.code,
        })
        .where('id', purchase.purchase_id)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Remove old products
 */
exports.removeOldProducts = function (db, purchaseId) {
    var q = Q.defer();

    db('purchases_detail')
        .where('purchase_id', purchaseId)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Remove purchase
 */
exports.removePurchase = function (db, id) {

    var q = Q.defer();

    db('purchases')
        .where('id', id)
        .delete()
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};
