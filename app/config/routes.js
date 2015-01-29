var main = require('../controllers/main'),
    orders = require('../controllers/orders');

module.exports = function (app) {
    // Main page
    app.get('/', main.index);
    app.get('/orders', function (req, res) {
        res.render('orders/index');
    });

    app.get('/orders/:id([0-9]+)', function (req, res) {
        res.render('orders/detail', {
            orderId: req.params.id
        });
    });
    // Cancel order request
    app.post('/orders/cancel', orders.doCancel);
    // Approve order request
    app.post('/orders/approve', orders.saveApprove);

    app.post('/orders/lots', orders.getLots);

    app.post('/orders/detail', orders.getDetail);

    app.post('/orders/list', orders.getList);

    app.get('/products', main.products);
    app.get('/orders/save', main.saveOrders);
};
