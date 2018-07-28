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


    var order =
      {Quantity: itemQuantity, foodId: itemId, name: $name.text(), price: $price}

      var cookie = Cookies.getJSON('cart');
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
        $listItem.append($price)
        $listItem.appendTo($orderList);
      }

    $($orderList).appendTo($modal);
    let $totalPrice = $('<span>').attr('class', 'total-price').text(`$${total}`)
    $totalPrice.appendTo('.modal-body')
    $('<textarea>').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments').attr('class', 'comments').appendTo('.modal-footer');
    $('<input>').attr('id', 'name').attr('placeholder', 'name').attr('required', '').prependTo('.modal-header')
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
    let user = {};
    for (var i = 0; i < finalCookieOrder.length; i++) {
      finalOrderObj.quantity_of_items.push(finalCookieOrder[i]);

    }
    finalOrderObj['comments'] = $comments;
    finalOrderObj['total_price'] = Number(totalPriceNum);



     if (phoneNoDash[0] !== "1") {
      user['phone_number'] = "+1" + phoneNoDash;
    } else{
      user['phone_number'] = "+" + phoneNoDash;
    }

    let $name = $('#name').val();
    if ($name) {
      console.log('you typed your name');
    } else {
      alert('Please enter your name!');
    }

    user['name'] = $('#name').val();

    //need to empty cart so they cannot keep pressing order
    //leave a message - Thank you! your order has been sent and we will let you know via text when it is ready

    const twilioOrder = {
      name: $name,
      phoneNumber: user.phone_number,
      orderItems: finalOrderObj.quantity_of_items,
      totalPrice: $totalPrice
    }

    $.ajax({
      method: "POST",
      url: "/api/users",
      data: user
    })
    .done(function(id) {
      finalOrderObj['user_id'] = id[0]
      console.log(finalOrderObj)
      $.ajax({
        method: "POST",
        url: "/api/orders",
        data: finalOrderObj
      })
      .done(function(orderId){
        console.log(orderId[0])
      })
      .
    })




  })


});


