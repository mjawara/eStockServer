/**
Configuration file
**/

var path = require('path');

module.exports = {
    db: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'estock_serv',
            port: 3306
        }
    },

    rootPath: path.join(__dirname, '../../'),
    uploadedPath: path.join(__dirname + '/../uploaded/'),
    tmpPath: path.join(__dirname + '/../tmp/'),
    port: 3000
};
