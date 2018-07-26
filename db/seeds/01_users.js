
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 4, name: 'Jessica', phone_number: '8642449944'}),
        knex('users').insert({id: 5, name: 'Pam', phone_number: '2340985235'}),
        knex('users').insert({id: 6, name: 'Michael', phone_number: '8253962355'})
      ]);
    });
};
