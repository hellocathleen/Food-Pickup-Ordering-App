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



  const $cartbtn = $('#cartbtn'); //modal button


  // $cartbtn.on('show.bs.modal', function() {
  // //   $('.modal .fade').show();
  //   console.log('cart button clicked')
  //   //
  // })

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


  })

  // const $closeBtn = $('#close');


  // $closeBtn.on('click', function() {
  //   $modal.modal('hide')
  // })

  //on send order

  //create a get request to query database for item ids
  //create an order object with name, id, items, comments etc
  //status: true
    //then post the order

  // send thr ajax to /api/orders
  //.ajax post

});
