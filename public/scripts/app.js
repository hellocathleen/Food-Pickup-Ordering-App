

$(document).ready(function() {



  const $divCard = $('.card')
  const $addToCart = $('.addCart')
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
  const $orderList = $('.modal-body ol')
  const $modal = $('.modal-body')
  $('<textarea>').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments').attr('class', 'comments').appendTo('.modal-footer');
  $('<input>').attr('id', 'name').attr('placeholder', 'name').attr('required', '').prependTo('.modal-header')
  $('<input>').attr('type', 'text').attr('name', 'phone-number').attr('placeholder', 'phone number with area code').attr('class', 'phone-number').prependTo('.modal-header')


  $('<textarea>').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments').attr('class', 'comments').appendTo('.modal-footer')
  $('<input>').attr('id', 'name').attr('placeholder', '').attr('required', '').attr('class', ' name').prependTo('.modal-header')
  $('<input>').attr('type', 'text').attr('name', 'phone-number').attr('placeholder', ' XXX-XXX-XXXX').attr('class', 'phone-number').prependTo('.modal-header')



  $cartbtn.click(function() {
    $('ol').empty();
    $('.modal-body').empty();

    let allCookies = Cookies.getJSON('cart');
    let total = 0;
      for (var i = 0; i < allCookies.length; i++) {
        total += allCookies[i].price * allCookies[i].Quantity
        $listItem = $('<li>').attr('id', allCookies[i].name).text(`${allCookies[i].name}   x ${allCookies[i].Quantity}`)
        $price = $('<span>').text('$' + (allCookies[i].price*allCookies[i].Quantity).toFixed(2)).attr('class', 'price')
        const $deleteSpan = $('<span>');
        const $delete = $('<button>').text('Remove');
        $deleteSpan.append($delete)
        $listItem.append($deleteSpan)
        $listItem.append($price)
        $listItem.appendTo($orderList);

      }

      //  $('#delete').on('click', function() {
      //     let $id = $(this).attr('id');
      //     let $parent = $(this).parent();
      //     console.log($parent)
      //     let $parentOfParent = $parent.parent();
      //     $parentOfParent.remove()
      // })



    $($orderList).appendTo($modal);
    let $totalPrice = $('<span>').attr('class', 'total-price').text(`$${total.toFixed(2)}`)
    $totalPrice.appendTo('.modal-body')

  });

    
  });
  
  

  const $confirm = $('#confirm');
  $confirm.on('click', function() {

    let finalCookieOrder = Cookies.getJSON('cart');
    let $phone = $('.phone-number').val();
    let phoneNoDash = $phone.replace(/\D/g,'');
    let $name = $('#name').val();

    if (phoneNoDash.length < 10) {
      alert('Please add your phone number including area code!');
    } else if (!$name) {
      alert('Please enter your name!');
    } else {

    let $comments = $('.comments').val();
    let $totalPrice = $('.total-price').text();
    let totalPriceNum = $totalPrice.slice(1);
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

    user['name'] = $('#name').val();


    const twilioOrder = {
      name: $name,
      phoneNumber: user.phone_number,
      orderItems: finalOrderObj.quantity_of_items,
      totalPrice: $totalPrice,
      comments: $comments
    }

    if ($name && user.phone_number) {

    $.ajax({
      method: "POST",
      url: "/api/users",
      data: user
    })
    .done(function(id) {
      finalOrderObj['user_id'] = id[0]
      $.ajax({
        method: "POST",
        url: "/api/orders",
        data: finalOrderObj
      })
      .done(function(orderId){
        twilioOrder['orderId'] = orderId[0];
        $.ajax({
          method: "POST",
          url: "/orderSend",
          data: twilioOrder
        })
      })
    });

  }

  $('.modal-body').replaceWith(`<p2>Thank you ${name} for your order!  We will send you text confirmation and a text when it is ready for pickup! Happy Hippoing!</p2>`);
    $('.modal-footer').empty();
    $('.modal-header').empty();
  }


  });

});


