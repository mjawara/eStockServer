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
        .select(
            'p.purchase_date', 'p.code', 'p.contact_name', 'p.id',
            'p.is_imported', 's.name as supplier_name'
        )
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
        .select(
            'p.code', 'p.supplier_id', 'p.purchase_date',
            's.contact_name', 's.name as supplier_name'
        )
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
            code: purchase.code
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

/**
 * Get purchase detail for import
 */
exports.getImportData = function (db, id) {
    /*
    select p.code, p.purchase_date, s.name, pd.product_code, pd.qty
from purchases_detail as pd
left join purchases as p on p.id=pd.purchase_id
left join suppliers as s on s.id=p.supplier_id
where pd.purchase_id=4
     */
    var q = Q.defer();

    db('purchases_detail as pd')
        .select('p.code', 'p.purchase_date', 'p.supplier_id', 'pd.product_code', 'pd.qty')
        .leftJoin('purchases as p', 'p.id', 'pd.purchase_id')
        //.leftJoin('suppliers as s', 's.id', 'p.supplier_id')
        .where('pd.purchase_id', id)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;

};
/**
 * Import data
 */
exports.doImport = function (db, item) {

    var q = Q.defer();

    var sql = 'insert into stock_cards set ccode=?, supplier_id=?, cdate=?, ' +
        'product_code=?, qty_in=?, created_at=? ' +
        'ON DUPLICATE KEY UPDATE qty_in=?';

    db.raw(sql, [
        item.code, item.supplier_id, moment(item.purchase_date).format('YYYY-MM-DD HH:mm:ss'),
        item.product_code, item.qty, moment().format('YYYY-MM-DD HH:mm:ss'), item.qty])
        .exec(function (err) {
            if (err) {
                q.reject(err);
            } else {
                q.resolve();
            }
        });

    return q.promise;

};

/**
 * Update purchase status to imported
 */
exports.changeImportStatus = function (db, id) {

    var q = Q.defer();

    db('purchases')
        .where('id', id)
        .update({
            is_imported: 'Y'
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Check is imported
 */
exports.checkImported = function (db, id) {

    var q = Q.defer();

    db('purchases')
        .count('* as total')
        .where('id', id)
        .where('is_imported', 'Y')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else {
                var isImported = rows[0].total > 0 ? true : false;
                q.resolve(isImported);
            }
        });

    return q.promise;
};
