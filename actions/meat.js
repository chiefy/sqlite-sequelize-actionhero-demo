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