var Q = require('q'),
    moment = require('moment');

exports.saveOrdersOnline = function(db, hospcode, orders) {
    var q = Q.defer();

    db('orders')
        .returning('id')
        .insert({
            hospcode: hospcode,
            client_orders_id: orders.orders_id,
            orders_date: orders.orders_date,
            orders_code: orders.orders_code,
            client_staff_name: orders.staff_name,
            client_staff_id: orders.staff_id,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function(err, id) {
            if (err) q.reject(err);
            else q.resolve(id);
        });

    return q.promise;
};

exports.saveOrdersOnlineDetail = function(db, items) {
    var q = Q.defer();

    db('orders_detail')
        .insert(items)
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.getOrdersList = function(db, statusId) {

    var q = Q.defer();

    if (statusId > 0) {
        db('orders as o')
            .select('o.*', 'h.hospname')
            .leftJoin('hospcode as h', 'h.hospcode', 'o.hospcode')
            .where('o.orders_status_id', statusId)
            .orderBy('o.created_at', 'asc')
            .exec(function(err, rows) {
                if (err) q.reject(err);
                else q.resolve(rows);
            });
    } else {
        db('orders as o')
            .select('o.*', 'h.hospname')
            .leftJoin('hospcode as h', 'h.hospcode', 'o.hospcode')
            //.where('o.orders_status_id', statusId)
            .orderBy('o.created_at', 'asc')
            .exec(function(err, rows) {
                if (err) q.reject(err);
                else q.resolve(rows);
            });
    }

    return q.promise;

};

exports.getDetail = function(db, orderId) {

    var q = Q.defer();

    db('orders as o')
        .select('o.*', 'h.hospname', 'u.fullname as master_staff_name')
        .leftJoin('hospcode as h', 'h.hospcode', 'o.hospcode')
        .leftJoin('users as u', 'u.id', 'o.master_staff_id')
        .where('o.id', orderId)
        .exec(function(err, rows) {

            if (err) q.reject(err);
            else q.resolve(rows[0]);

        });

    return q.promise;
};

exports.getProducts = function(db, orderId) {
    var q = Q.defer();

    db('orders_detail as o')
        .select('o.*', 'p.name as product_name', 'p.units', 'p.price', 'p.cost', 'p.stdcode', 'l.lot_name')
        .leftJoin('products as p', 'p.code', 'o.product_code')
        .leftJoin('lots as l', 'l.lot_id', 'o.lot_id')
        .where('o.orders_id', orderId)
        .exec(function(err, rows) {
            q.resolve(rows);
        }, function(err) {
            q.reject(err);
        });

    return q.promise;
};

exports.getLots = function(db, code) {
    var q = Q.defer();
    db('lots')
        .where('product_code', code)
        .orderBy('lot_name', 'asc')
        .exec(function(err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

exports.saveItemApprove = function(db, orderId, productCode, approveQty, lot) {
    var q = Q.defer();
    db('orders_detail')
        .where('orders_id', orderId)
        .where('product_code', productCode)
        .update({
            approve_qty: approveQty,
            lot_id: lot
        })
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.updateOrdersApprove = function(db, orderId, statusId, userId) {
    var q = Q.defer();

    db('orders')
        .where('id', orderId)
        .update({
            approved_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            master_staff_id: userId,
            orders_status_id: statusId,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.doCancel = function(db, orderId) {
    var q = Q.defer();

    db('orders')
        .where('id', orderId)
        .update({
            orders_status: '3'
        })
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.doCancelOnline = function(db, orderCode) {
    var q = Q.defer();

    db('orders')
        .where('orders_code', orderCode)
        .delete()
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

/**
 * Import data
 */
exports.doImport = function (db, item) {

    var q = Q.defer();

    db('stock_cards')
        .insert({
            ccode: item.code,
            hospcode: item.hospcode,
            cdate: moment(item.purchase_date).format('YYYY-MM-DD HH:mm:ss'),
            product_code: item.product_code,
            qty_out: item.qty,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;

};

/**
 * Get orders status
 */
exports.getOrderStatusList = function (db) {
    var q = Q.defer();

    db('orders_status')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
/**
 * Client api
 */
exports.getOnlineStatus = function (db, hospcode) {

    var q = Q.defer();

    db('orders as o')
        .select(
            'o.id', 'o.client_orders_id', 'o.orders_date', 'o.orders_code', 'o.client_staff_name',
            'o.client_staff_id', 's.name as status_name', 'o.orders_status_id', 'o.updated_at',
            db.raw('(select count(distinct product_code) from orders_detail where orders_id=o.id) as total_qty'))
        .leftJoin('orders_status as s', 's.id', 'o.orders_status_id')
        .where('o.hospcode', hospcode)
        .groupBy('o.id')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;

};

exports.getOnlineDetail = function (db, id) {
    var q = Q.defer();

    db('orders_detail as o')
        .select('p.code', 'p.name as product_name', 'o.qty', 'o.approve_qty', 'l.lot_name', 'p.cost', 'p.price', 'p.stdcode')
        .leftJoin('products as p', 'p.code', 'o.product_code')
        .leftJoin('lots as l', 'l.lot_id', 'o.lot_id')
        .where('o.orders_id', id)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
