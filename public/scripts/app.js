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
    // let fakeCookieString = JSON.stringify(fakeCookie);
    Cookies.set('cart', fakeCookie)


  $addToCart.on('click', function(){

    const $name = $(this).siblings('.card-title');
    const $price = $(this).siblings('#price').text().replace('$', '')
    const itemId = $(this).attr('id').replace('addToCart', '');//string
    const $itemAdded = $('<li>').text($name.text())
    const itemQuantity = $(this).siblings('#quantity').val() //set to change back to one

    //still need to append items to modal body
    console.log($name.text(), $price)

//columns that don't need to be added yet are: order status, created at, total price, comments, wait time
    var order =
      {Quantity: itemQuantity, foodId: itemId, name: $name.text(), price: $price}

      var cookie = Cookies.getJSON('cart')
        console.log("before push: ", cookie);
        cookie.push(order);
        console.log("after push: ", cookie);
        Cookies.set('cart', cookie);

  });

  const $cartbtn = $('#cartbtn')
  var $orderList = $('.modal-body ol')
  const $modal = $('.modal-body')

  console.log(Cookies.getJSON('cart'))
  cookieFull = Cookies.getJSON('cart')

  function createListElement (x) {

    // $listItem = $('<li>')
    $('<li>').text(x.name).appendTo($orderList)

    console.log($orderList.html())
    return $orderList
  }

  function renderList(z) {

    z.forEach(function(element) {
      $modal.append(createListElement(element))
    })

  }

  // take our cookies array - array of object - for each object
  // take the name of it and append to a list item
  // for that list item append to ordered list element


  $cartbtn.click(function() {
    $('ol').empty();

    let allCookies = Cookies.getJSON('cart');

      for (var i = 0; i < allCookies.length; i++) {
        $listItem = $('<li>').text(`${allCookies[i].name}   x ${allCookies[i].Quantity}`)
        $price = $('<span>').text('$' + (allCookies[i].price*allCookies[i].Quantity).toFixed(2)).attr('class', 'price').attr('style', 'float: right;')
        $listItem.append($price)
        $listItem.appendTo($orderList);

      }


    $($orderList).appendTo($modal);
    $('<span>').appendTo('.modal-body')
    $('<input>').appendTo('.modal-body').attr('type', 'text').attr('name', 'comments').attr('placeholder', 'add comments')
    $('<input>').appendTo('.modal-body').attr('type', 'text').attr('name', 'phone-number')



  });

  $modal.on("hidden.bs.modal", function(){
    $modal.text("");
  });

});

  //on send order

  //create a get request to query database for item ids
  //create an order object with name, id, items, comments etc
  //status: true
    //then post the order

  // send thr ajax to /api/orders
  //.ajax post


