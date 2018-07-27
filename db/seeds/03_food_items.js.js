
exports.seed = function(knex, Promise) {
  return Promise.all([
    // updates seed entries
    knex('food_items').where({ id: 3 }).update({ picture:'/images/salmon.jpg' }),
    knex('food_items').where({ id: 1 }).update({ picture:'/images/pizza.jpg' }),
    knex('food_items').where({ id: 4 }).update({ picture:'/images/burger.jpg' }),
    knex('food_items').where({ id: 7 }).update({ picture:'/images/quesadilla.jpeg' }),
    knex('food_items').where({ id: 5 }).update({ picture:'/images/chicken_sandwich.jpg' }),
    knex('food_items').where({ id: 6 }).update({ picture:'/images/veggie_burger.jpeg' }),
    knex('food_items').where({ id: 10 }).update({ picture:'/images/green_salad.jpg' }),
    knex('food_items').where({ id: 12 }).update({ picture:'/images/tomato_soup.jpg' }),
    knex('food_items').where({ id: 16 }).update({ picture:'/images/side_salad.jpg' }),
    knex('food_items').where({ id: 17 }).update({ picture:'/images/side_soup.png' }),
    knex('food_items').where({ id: 14 }).update({ picture:'/images/yam_fries.jpg' }),
    knex('food_items').where({ id: 15 }).update({ picture:'/images/caesar_salad.jpg' }),
    knex('food_items').where({ id: 18 }).update({ picture:'/images/cheesecake.jpg' })
  ]);
};
