//empty file to trick migration directory
//original file did not migrate and was messing up migration


exports.up = function(knex, Promise) {
  return Promise.all([
      // knex.schema.table('users', function(table) {
      //   // table.string('phone_number');
      // })
    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
      // knex.schema.table('users', function(table) {
      //   table.dropColumn('phone_number')
      // })
    ])
  };
