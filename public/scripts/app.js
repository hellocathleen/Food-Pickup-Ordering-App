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

   let fakeCookie = [];
    Cookies.set('cart', fakeCookie)


  $addToCart.on('click', function(){

    const $name = $(this).siblings('.card-title');
    const $price = $(this).siblings('#price').text().replace('$', '')
    const itemId = $(this).attr('id').replace('addToCart', '');//string
    const $itemAdded = $('<li>').text($name.text())
    const itemQuantity = $(this).siblings('#quantity').val() //set to change back to one



//columns that don't need to be added yet are: order status, created at, total price, comments, wait time
    var order =
      {Quantity: itemQuantity, foodId: itemId, name: $name.text(), price: $price}

      var cookie = Cookies.getJSON('cart')
        cookie.push(order);
        Cookies.set('cart', cookie);

  });

  const $cartbtn = $('#cartbtn')
  var $orderList = $('.modal-body ol')
  const $modal = $('.modal-body')


  $cartbtn.click(function() {
    $('ol').empty();
    $('.modal-body').empty();

    let allCookies = Cookies.getJSON('cart');
    console.log(allCookies)
    let total = 0;
      for (var i = 0; i < allCookies.length; i++) {
        console.log(allCookies[i].price)
        total += allCookies[i].price * allCookies[i].Quantity
        $listItem = $('<li>').text(`${allCookies[i].name}   x ${allCookies[i].Quantity}`)
        $price = $('<span>').text('$' + (allCookies[i].price*allCookies[i].Quantity).toFixed(2)).attr('class', 'price')
        // $('<span>').text().appendTo('.modal-body')
        $listItem.append($price)
        $listItem.appendTo($orderList);

      }


    $($orderList).appendTo($modal);
    let $totalPrice = $('<span>').text(`$${total}`)
    $totalPrice.appendTo('.modal-body')
    $('<input>').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments').appendTo('.modal-body')
    $('<input>').attr('type', 'text').attr('name', 'phone-number').attr('placeholder', 'phone number').appendTo('.modal-body')



  });


});

