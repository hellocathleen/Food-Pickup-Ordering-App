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




  const $cartbtn = $('#cartbtn');

  $cartbtn.on('show.bs.modal', function() {
  //   $('.modal .fade').show();
    console.log('cart button clicked')
  })

  //on send order

  //create a get request to query database for item ids
  //create an order object with name, id, items, comments etc
  //status: true
    //then post the order

  // send thr ajax to /api/orders
  //.ajax post

});
