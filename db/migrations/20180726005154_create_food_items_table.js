
exports.up = function(knex, Promise) {
  return knex.schema.createTable('food_items', function(table){
    table.increments();
    table.string('name');
    table.string('description');
    table.decimal('price');
    table.integer('prep_time');
    table.string('classification');
    table.string('picture');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('food_items')
};
