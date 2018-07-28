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
    $('.modal-footer.comments').empty();

    let allCookies = Cookies.getJSON('cart');
    let total = 0;
      for (var i = 0; i < allCookies.length; i++) {
        total += allCookies[i].price * allCookies[i].Quantity
        $listItem = $('<li>').text(`${allCookies[i].name}   x ${allCookies[i].Quantity}`)
        $price = $('<span>').text('$' + (allCookies[i].price*allCookies[i].Quantity).toFixed(2)).attr('class', 'price')
        // $('<span>').text().appendTo('.modal-body')
        $listItem.append($price)
        $listItem.appendTo($orderList);

      }


    $($orderList).appendTo($modal);
    const $totalPrice = $('<span>').attr('class', 'total-price').text(`$${total}`)
    $totalPrice.appendTo('.modal-body')
    $('<textarea>').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments').attr('class', 'comments').appendTo('.modal-footer')
    $('<input>').attr('type', 'text').attr('name', 'phone-number').attr('placeholder', 'phone number with area code').attr('class', 'phone-number').prependTo('.modal-header')

  });


  const $confirm = $('#confirm');
  $confirm.on('click', function(){
    let finalCookieOrder = Cookies.getJSON('cart');
    let $phone = $('.phone-number').val();
    let phoneNoDash = $phone.replace(/\D/g,'')

    if (phoneNoDash.length < 10) {
      alert('Please add your phone number including area code!');
    }
    let $comments = $('.comments').val();
    let $totalPrice = $('.total-price').text()
    let totalPriceNum = $totalPrice.slice(1)
    let finalOrderObj = {quantity_of_items: []}
    for (var i = 0; i < finalCookieOrder.length; i++) {
      // finalOrder.push(finalCookieOrder[i]);
      finalOrderObj.quantity_of_items.push(finalCookieOrder[i]);
    }
    if (phoneNoDash[0] !== "1") {
      finalOrderObj['phone'] = "+1" + phoneNoDash
    } else{
      finalOrderObj['phone'] = "+" + phoneNoDash
    }

    finalOrderObj['comments'] = $comments
    finalOrderObj['total_price'] = Number(totalPriceNum)
    console.log(finalOrderObj)



  })


});


