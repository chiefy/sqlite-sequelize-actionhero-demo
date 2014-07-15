var Sequelize = require('sequelize');

exports.sqlite = function(api, next) {
    var sqlize = new Sequelize(null, null, null, api.config.sqlite);
    
    api.sqlite = {};

    api.sqlite._start = function(api, next) {

        api.models = {
            Meat: sqlize.import(__dirname + '/../models/Meat.js')
        };

        sqlize
            .sync()
            .then(syncSuccess, syncError);

        function syncSuccess() {
            api.log('Succesfully synced DB!');
            next();
        }

        function syncError(ex) {
            api.log('Error while executing DB sync: '+ ex.message, 'error');
            process.exit();
        }
    };

    api.sqlite._stop = function(api, next) {
        next();
    };

    next();
}