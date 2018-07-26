
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.table('users', function(table) {
      table.integer('user_orders');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.table('users', function(table) {
      table.dropColumn('user_orders');
    })
  ])
};
