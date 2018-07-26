// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {

  function createMenuItems(item) {
    //when document loads, create the cards for each menu item
  //takes in one object and creates the card for it

  //create the variables from the database info
  let name = item.name;
  let desc = item.description;
  let price = item.price;
  let prepTime = item.prep_time;
  let type = item.classification;
  let image = item.picture; //image url

  //create the card pieces
  let $divColSize = $('<div>').attr('class', 'col-sm-4')
  let $divcard = $('<div>').attr('class', 'card');
  let $img = $('<img>').attr('class', 'card-img-top').attr('src', image);
  let $divbody = $('<div>').attr('class', 'card-body')
  let $title = $('<h5>').attr('class', 'card-title').text(name);
  let $description = $('<p>').attr('class', 'card-text').text(desc);
  let $spanPrice = $('<span>').attr('id', 'price').text(`$${price}`);
  let $addToCart = $('<a>').attr('href', '#').attr('class', 'btn btn-md btn-primary').text('Add to Cart');

  $divbody.append($title, $description, $spanPrice, $addToCart);
  $divcard.append($img, $divbody);
  $divColSize.append($divcard);
  return $divColSize;

  }

  //render the cards - take in array of menu items as objects
  //for each menu item, create the cards

  function renderCards(menuItems) {
    menuItems.forEach(function(item) {
      let menuItemCard = createMenuItems(item);
      if (item.classification === 'Soup_Salad') {
        $('#soups').append(menuItemCard);
      } else if (item.classification === 'Main') {
        $('#mains').append(menuItemCard);
      } else if (item.classification === 'Side') {
        $('#sides').append(menuItemCard);
      } else if (item.classification === 'Dessert') {
        $('#desserts').append(menuItemCard);
      }

    })

  }

  //load the cards
  function loadMenuItems() {
    $.ajax('/api/fooditems', {
      method: 'GET',
    })
    .done(function(items){
      renderCards(items);
    });
  }

  loadMenuItems();

});
