exports.meatAdd = {
    name: 'meatAdd',
    description: 'Add a new meat!',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,

    inputs: {
        required: ['name'],
        optional: ['is_tasty', 'tastes_like'],
    },

    run: function(api, connection, next) {

        var new_meat = {
            name: connection.params.name,
            is_tasty: !!connection.params.is_tasty || true,
            tastes_like: connection.params.tastes_like || null
        };

        function createSuccess(created_meat) {
            connection.response.meat = created_meat;
        }

        function createError(err) {
            api.log('Could not create new meat named: ' + new_meat.name, 'error');
            connection.error = err;
        }

        api.models.Meat
            .create(new_meat)
            .then(createSuccess, createError)
            .finally(function() {
                next(connection, true);
            });

    }

};

exports.meatUpdate = {
    name: 'meatUpdate',
    description: 'Update your meat!',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,

    inputs: {
        required: ['id'],
        optional: ['name', 'is_tasty', 'tastes_like'],
    },

    run: function(api, connection, next) {

        api.models.Meat
            .find(connection.params.id)
            .then(function(meat) {
                if (!meat) {
                    connection.rawConnection.responseHttpCode = 404;
                    return next(connection, true);
                }
                return meat.updateAttributes(connection.params);
            })
            .then(updateSuccess, updateError)
            .finally(function() {
                next(connection, true);
            });

        function updateSuccess(created_meat) {
            connection.response.meat = created_meat;
        }

        function updateError(err) {
            api.log('Could not update meat id: ' + connection.params.id, 'error');
            connection.error = err;
        }
    }

};

exports.meatDelete = {
    name: 'meatDelete',
    description: 'Delete your meat!',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,

    inputs: {
        required: ['id'],
        optional: [],
    },

    run: function(api, connection, next) {

        api.models.Meat
            .find(connection.params.id)
            .then(function(meat) {
                if (!meat) {
                    connection.rawConnection.responseHttpCode = 404;
                    return next(connection, true);
                }
                return meat.destroy();
            })
            .then(deleteSuccess, deleteError)
            .finally(function() {
                next(connection, true);
            });

        function deleteSuccess() {}

        function deleteError(err) {
            api.log('Could not delete meat id: ' + connection.params.id, 'error');
            connection.error = err;
        }
    }

};