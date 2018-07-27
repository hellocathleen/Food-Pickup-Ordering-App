
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.decimal('total_price');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('status').defaultTo(false);
    table.string('comments');
    table.integer('est_wait_time');
    table.string('quantity_of_items');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
