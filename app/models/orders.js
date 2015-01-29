var Q = require('q'),
    moment = require('moment');

exports.saveOrders = function(db, hospcode, orders) {
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

exports.saveOrdersDetail = function(db, items) {
    var q = Q.defer();

    db('orders_detail')
        .insert(items)
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.getOrdersList = function(db, opt) {

    var q = Q.defer();
    db('orders as o')
        .select('o.*', 'h.hospname')
        .leftJoin('hospcode as h', 'h.hospcode', 'o.hospcode')
        .where('o.is_approve', opt)
        .orderBy('o.created_at', 'asc')
        .exec(function(err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;

};

exports.getDetail = function(db, orderId) {

    var q = Q.defer();

    db('orders as o')
        .select('o.*', 'h.hospname')
        .leftJoin('hospcode as h', 'h.hospcode', 'o.hospcode')
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
        .select('o.*', 'p.name as product_name', 'p.units', 'p.price', 'p.cost')
        .leftJoin('products as p', 'p.code', 'o.product_code')
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

exports.updateOrdersApprove = function(db, orderId) {
    var q = Q.defer();

    db('orders')
        .where('id', orderId)
        .update({
            orders_status: '1',
            approve_date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function(err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};
