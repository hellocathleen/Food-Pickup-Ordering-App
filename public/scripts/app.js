// // $(() => {
// //   $.ajax({
// //     method: "GET",
// //     url: "/api/users"
// //   }).done((users) => {
// //     for(user of users) {
// //       $("<div>").text(user.name).appendTo($("body"));
// //     }
// //   });;
// // });

$(document).ready(function() {




  const $divCard = $('.card')
  const $addToCart = $('.addCart')
  // const $modal = $('.modal')
  const $modalBody = $('.model-body ol')


  $addToCart.on('click', function(){

    const $name = $(this).siblings('.card-title');
    const $price = $(this).siblings('#price').text().replace('$', '')

    const itemId = $(this).attr('id').replace('addToCart', '');//string
    const $itemAdded = $('<li>').text($name.text())
    console.log($itemAdded.text())
    const itemQuantity = $(this).siblings('#quantity').val() //set to change back to one

    //still need to append items to modal body
    console.log($name.text(), $price)

//columns that don't need to be added yet are: order status, created at, total price, comments, wait time
    const order = {
      quantity_of_items: [{Quantity: itemQuantity, foodId: itemId, name: $name.text(), price: $price}]

    }

    $.ajax("/api/cart", {
      method: 'POST',
      data: order
      })
      .done(function(cookieId) {
        console.log('a thing happened!')
      })

    });





  });




  //on send order

  //create a get request to query database for item ids
  //create an order object with name, id, items, comments etc
  //status: true
    //then post the order

  // send thr ajax to /api/orders
  //.ajax post


