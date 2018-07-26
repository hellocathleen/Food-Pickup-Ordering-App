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

$(document).ready(function(){

  const items = [
    {
      id: 1,
      name: 'Sante Fe Salad',
      description: 'Very yummy salad',
      price: '$12.99',
      preptime: '3 mins',
      type: 'salad',
      picture: 'https://earls-public.storage.googleapis.com/content/menu_items/images/000/000/128/original/153.jpg'
    }

  ]

  function createMenuItems(item) {
    //when document loads, create the cards for each menu item
  //takes in one object and creates the card for it

  //create the variables from the database info
  let name = item.name;
  let desc = item.description;
  let price = item.price;
  let prepTime = item.preptime;
  let type = item.type;
  let image = item.image; //image url

  //create the card pieces
  let $divcard = $('<div>').attr('class', 'card');
  let $img = $('<img>').attr('class', 'car-img-top').attr('src', image);
  let $divbody = $('<div>').attr('class', 'card-body')
  let $title = $('<h5>').attr('class', 'card-title').text(name);
  let $description = $('<p>').attr('class', 'card-text').text(desc);
  let $span = $('<span>').attr('id', 'price').text(price);
  let $addToCart = $('<a>').attr('href', '#').attr('btn btn-primary').text('Add to Cart');

  //append to div
  $divbody.append($title);
  $divbody.append($description);
  $divbody.append($addToCart);
  $divcard.append($img);
  $divcard.append($divbody);

  return $divcard;

  }

  //render the cards - take in array of menu items as objects
  //for each menu item, create the cards

  function renderCards(menuItems) {
    menuItems.forEach(item) {
      let menuItemCard = createMenuItems(item);
      if (item.type === 'soup') {
        $('#soups').append(menuItemCard);
      } else if (item.type === 'main') {
        $('#mains').append(menuItemCard);
      } else if (item.type === 'sides') {
        $('#sides').append(menuItemCard);
      } else if (item.type === 'desserts') {
        $('#desserts').append(manuItemCard);      }
    }
  }

  //load the cards
  function loadMenuItems () {

  }



});
