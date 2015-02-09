var main = require('../controllers/main'),
    orders = require('../controllers/orders'),
    clients = require('../controllers/clients'),
    suppliers = require('../controllers/suppliers'),
    products = require('../controllers/products'),

    purchases = require('../controllers/purchases'),
    peroids = require('../controllers/peroids');

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
    app.post('/products/list', products.getList);

    app.get('/orders/save', main.saveOrders);


    /** Purchases drug **/

    app.get('/purchases', function (req, res) {
        res.render('purchases/index');
    });

    /** Clients setting **/
    app.get('/clients', function (req, res) {
        res.render('clients/index');
    });

    app.get('/clients/add', function (req, res) {
        res.render('clients/add');
    });

    app.post('/clients/save', clients.doSave);
    app.post('/clients/list', clients.getList);
    app.post('/clients/active', clients.active);

    // Suppliers
    app.get('/suppliers', function (req, res) {
        res.render('suppliers/index');
    });

    // Suppliers partials
    app.get('/partials/suppliers/index', function (req, res) {
        res.render('suppliers/partials/index');
    });

    app.get('/partials/suppliers/add', function (req, res) {
        res.render('suppliers/partials/add');
    });

    app.get('/partials/suppliers/edit', function (req, res) {
        res.render('suppliers/partials/edit');
    });

    // Save supplier
    app.post('/suppliers/save', suppliers.doSave);
    // Update
    app.post('/suppliers/update', suppliers.doUpdate);
    // Get supplies list
    app.post('/suppliers/list', suppliers.getList);
    app.post('/suppliers/detail', suppliers.detail);
    app.post('/suppliers/remove', suppliers.doRemove);


    // Purchases
    app.get('/partials/purchases/index', function (req, res) {
        res.render('purchases/partials/index');
    });

    app.get('/partials/purchases/new', function (req, res) {
        res.render('purchases/partials/new');
    });

    app.get('/partials/purchases/edit', function (req, res) {
        res.render('purchases/partials/edit');
    });

    // Save purchase
    app.post('/purchases/save', purchases.doSave);
    app.post('/purchases/list', purchases.getList);
    app.post('/purchases/edit/detail', purchases.detail);
    app.put('/purchases', purchases.update);
    app.post('/purchases/remove', purchases.remove);

    //Settings
    app.get('/settings', function (req, res) {
        res.render('settings/index');
    });
    /**
     * GET  /partials/settings/index
     */
    app.get('/partials/settings/index', function (req, res) {
        res.render('settings/partials/index');
    });
    /**
     * GET  /partials/settings/years
     */
    app.get('/partials/settings/peroids', function (req, res) {
        res.render('settings/partials/peroids');
    });

    /**
     * POST  /settings/peroids/all
     */
    app.post('/settings/peroids/all', peroids.all);
    /**
     * POST  /settings/peroids/save
     */
    app.post('/settings/peroids/save', peroids.save);
    /**
     * POST  /settings/peroids/remove
     */
    app.post('/settings/peroids/remove', peroids.remove);
};
