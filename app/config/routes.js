var Main = require('../controllers/Main'),
    Orders = require('../controllers/Orders'),
    Clients = require('../controllers/Clients'),
    Suppliers = require('../controllers/Suppliers'),
    Products = require('../controllers/Products'),

    Purchases = require('../controllers/Purchases'),
    Peroids = require('../controllers/Peroids'),
    Users = require('../controllers/Users');

module.exports = function (app) {
    // Main page
    app.get('/', Main.index);
    app.get('/orders', function (req, res) {
        res.render('orders/Index');
    });

    app.get('/orders/:id([0-9]+)', function (req, res) {
        res.render('orders/Detail', {
            orderId: req.params.id
        });
    });
    // Cancel order request
    app.post('/orders/cancel', Orders.doCancel);
    // Approve order request
    app.post('/orders/approve', Orders.saveApprove);

    app.post('/orders/lots', Orders.getLots);

    app.post('/orders/detail', Orders.getDetail);

    app.post('/orders/list', Orders.getList);

    app.get('/products', Main.products);
    app.post('/products/list', Products.getList);

    app.get('/orders/save', Main.saveOrders);


    /** Purchases drug **/

    app.get('/purchases', function (req, res) {
        res.render('purchases/Index');
    });

    /** Clients setting **/
    app.get('/clients', function (req, res) {
        res.render('clients/Index');
    });

    app.get('/partials/clients/index', function (req, res) {
        res.render('clients/partials/Index');
    });

    app.get('/partials/clients/new', function (req, res) {
        res.render('clients/partials/New');
    });

    app.get('/partials/clients/edit', function (req, res) {
        res.render('clients/partials/Edit');
    });

    app.post('/clients/save', Clients.doSave);
    app.post('/clients/all', Clients.all);
    app.post('/clients/active', Clients.active);
    app.post('/clients/get', Clients.get);
    app.post('/clients/update', Clients.update);
    app.post('/clients/remove', Clients.remove);

    // Suppliers
    app.get('/suppliers', function (req, res) {
        res.render('suppliers/Index');
    });

    // Suppliers partials
    app.get('/partials/suppliers/index', function (req, res) {
        res.render('suppliers/partials/Index');
    });

    app.get('/partials/suppliers/add', function (req, res) {
        res.render('suppliers/partials/Add');
    });

    app.get('/partials/suppliers/edit', function (req, res) {
        res.render('suppliers/partials/Edit');
    });

    // Save supplier
    app.post('/suppliers/save', Suppliers.doSave);
    // Update
    app.post('/suppliers/update', Suppliers.doUpdate);
    // Get supplies list
    app.post('/suppliers/list', Suppliers.getList);
    app.post('/suppliers/detail', Suppliers.detail);
    app.post('/suppliers/remove', Suppliers.doRemove);


    // Purchases
    app.get('/partials/purchases/index', function (req, res) {
        res.render('purchases/partials/Index');
    });

    app.get('/partials/purchases/new', function (req, res) {
        res.render('purchases/partials/New');
    });

    app.get('/partials/purchases/edit', function (req, res) {
        res.render('purchases/partials/Edit');
    });

    // Save purchase
    app.post('/purchases/save', Purchases.doSave);
    app.post('/purchases/list', Purchases.getList);
    app.post('/purchases/edit/detail', Purchases.detail);
    app.put('/purchases', Purchases.update);
    app.post('/purchases/remove', Purchases.remove);

    //Settings
    app.get('/settings', function (req, res) {
        res.render('settings/Index');
    });
    /**
     * GET  /partials/settings/years
     */
    app.get('/settings/peroids', function (req, res) {
        res.render('settings/peroids/Peroids');
    });

    /**
     * POST  /settings/peroids/all
     */
    app.post('/settings/peroids/all', Peroids.all);
    /**
     * POST  /settings/peroids/save
     */
    app.post('/settings/peroids/save', Peroids.save);
    /**
     * POST  /settings/peroids/remove
     */
    app.post('/settings/peroids/remove', Peroids.remove);
    /**
     * POST  /settings/peroids/update
     */
    app.post('/settings/peroids/update', Peroids.update);
    /**
     * User management
     */
    app.get('/settings/users', function (req, res) {
        res.render('settings/users/Users');
    });

    app.post('/settings/users/all', Users.all);
    app.post('/settings/users/save', Users.save);
    app.post('/settings/users/remove', Users.remove);
    app.post('/settings/users/update', Users.update);
};
