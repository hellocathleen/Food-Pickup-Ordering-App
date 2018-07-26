
exports.seed = function(knex, Promise) {
  return Promise.all([
    // updates seed entries
    knex('food_items').where({ id: 2 }).update({ picture:'public/images/salmon.jpg' }),
    knex('food_items').where({ id: 3 }).update({ picture:'public/images/pizza.jpg' }),
    knex('food_items').where({ id: 3 }).update({ picture:'public/images/pizza.jpg' }),
    knex('food_items').where({ id: 4 }).update({ picture:'public/images/burger.jpg' }),
    knex('food_items').where({ id: 5 }).update({ picture:'public/images/quesadilla.jpeg' }),
    knex('food_items').where({ id: 6 }).update({ picture:'public/images/chicken_sandwich.jpg' }),
    knex('food_items').where({ id: 7 }).update({ picture:'public/images/veggie_burger.jpeg' }),
    knex('food_items').where({ id: 11 }).update({ picture:'public/images/green_salad.jpg' }),
    knex('food_items').where({ id: 13 }).update({ picture:'public/images/tomato_soup.jpg' }),
    knex('food_items').where({ id: 14 }).update({ picture:'public/images/side_salad.jpg' }),
    knex('food_items').where({ id: 15 }).update({ picture:'public/images/side_soup.png' }),
    knex('food_items').where({ id: 16 }).update({ picture:'public/images/yam_fries.jpg' }),
    knex('food_items').where({ id: 17 }).update({ picture:'public/images/caesar_salad.jpg' }),
    knex('food_items').where({ id: 18 }).update({ picture:'public/images/cheesecake.jpg' })
  ]);
};
