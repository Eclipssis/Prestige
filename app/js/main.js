jQuery(function($){

  $('input[placeholder], textarea[placeholder]').placeholder();

  // Большой подпункт меню
  $('.js-dropdown').click(function () {
    $('.dropdown-big').slideToggle()
  })

  // Слайдер на главной
  $('.carousel').carousel({
    interval: 4000,
    pause: "hover"
  })

  // Cтилизация селектов
  $('select').styler();

  // Открытие popover
  $('.header [data-toggle="popover"]').popover({
    placement: "bottom",
    html : true,
    content: function() {
      return $('#popover-cart').html();
    }
  });

  $('[data-toggle="popover"].color-link').popover({
    placement: "bottom",
    html : true,
    trigger: "hover",
    content: function() {
      return $('.color-popover').html();
    }
  });

  $('.product-features [data-toggle="popover"]').popover({
    placement: "bottom",
    html : true,
    trigger: "hover",
    content: function() {
      return $('.features-popover').html();
    }
  });
  

  function calcTotalPrice(argument) {
    var total_price = $('.js-total-price');
    var all_products = $('.cart-products .product--cart .js-product-total');
    var total = 0;

    for (var i = all_products.length - 1; i >= 0; i--) {
      var one_product_cost = parseFloat(all_products[i].innerHTML.replace(/\s/g, ''))
      var total = total + one_product_cost;
    }
    
    var total_to_HTML = total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    total_price.html(total_to_HTML + " руб.");
  }

  function calcProductPrice(that) {
    var product_price = $(that).closest(".product--cart").find(".js-current-price");
    var one_product_total = $(that).closest(".product--cart").find(".js-product-total");
    var input_val = $(that).parent().find('input').val();

    rezult = parseInt(product_price.html().replace(/\s/g, '')) * input_val;
    var rezult_to_HTML = rezult.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    one_product_total.html( rezult_to_HTML + " руб." );
  }

  function calcTotalProduts(argument) {
    var total_amount = $('.js-total-amount');
    var all_products = $('.cart-products .product--cart');
    total_amount.html(all_products.length + " шт.")
  }

  calcTotalPrice();
  calcTotalProduts();

  // Cчетчик + 1 - 
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();

    calcProductPrice(this)
    calcTotalPrice()

    return false;
  });

  $('.plus').click(function () {
     var $input = $(this).parent().find('input');
     $input.val(parseInt($input.val()) + 1);
     $input.change();

     calcProductPrice(this)
     calcTotalPrice()

     return false;
   });

  // Макса на телефон
  $(".js-mask-phone").mask("+7 (999) 999-99-99");


  // Удаление товара из корзины (header)
  $("body").on("click", ".popover-content .js-delete-cart-item", function () {
    setTimeout(function () {
      cart_item.slideUp()
    }, 350)
    var cart_item = $(this).parent().parent();
    cart_item.toggleClass('zoomOut animated')
  });

  // Удаление товара из корзины (cart.html)
  $(".product--cart").on("click", ".js-delete-cart-item", function () {

    var cart_item = $(this).closest(".product--cart")
    setTimeout(function () {
      cart_item.slideUp()
      cart_item.fadeOut(300, function(){ 
        $(this).remove();
        calcTotalPrice()
        calcTotalProduts()
      });
    }, 350)
    cart_item.toggleClass('zoomOutRight animated');
  });
 

  // Скролл header'a
  $(window).scroll(function() {
    if ( $(window).scrollTop() > 460 ){  
      $('.header, .middle').addClass("sticky");
    }
    else {
      $('.header, .middle').removeClass("sticky");
    }
  });

  $( '#example1' ).sliderPro({
    width: 728,
    height: 520,
    arrows: false,
    buttons: false,
    waitForLayers: true,
    thumbnailWidth: 100,
    thumbnailHeight: 115,
    thumbnailPointer: true,
    autoplay: false,
    imageScaleMode: "none",
    autoScaleLayers: false,
    thumbnailArrows: true,
    fadeThumbnailArrows: false,
    breakpoints: {
      500: {
        thumbnailWidth: 100,
        thumbnailHeight: 115
      }
    }
  });

  // Выбор цвера в карточке товара

  var color = $(".color-link");

  color.click(function () {

    if (color.hasClass('selected')) {
      color.removeClass('selected')
    }

    $(this).addClass('selected')
  })

  // Карусель на карточке товара
  $('.collection-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      navText:false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:4
          }
      }
  });

  // Карусель в галерее
  $('.gallery-carousel').owlCarousel({
      loop:true,
      margin:40,
      nav:true,
      navText:false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
  });
  // Open/Close Article 

  $('.js-open-full-article').click(function () {
    var article = $(this).closest(".article");
    article.find('.article__full').slideDown();
    $(this).fadeOut();
  });

  $('.js-close-full-article').click(function () {
    var article = $(this).closest(".article");

    article.find('.article__full').slideUp()
    article.find('.js-open-full-article').fadeIn();
  });



});//end ready


//Plugin placeholder
(function(b,f,i){function l(){b(this).find(c).each(j)}function m(a){for(var a=a.attributes,b={},c=/^jQuery\d+/,e=0;e<a.length;e++)if(a[e].specified&&!c.test(a[e].name))b[a[e].name]=a[e].value;return b}function j(){var a=b(this),d;a.is(":password")||(a.data("password")?(d=a.next().show().focus(),b("label[for="+a.attr("id")+"]").attr("for",d.attr("id")),a.remove()):a.realVal()==a.attr("placeholder")&&(a.val(""),a.removeClass("placeholder")))}function k(){var a=b(this),d,c;placeholder=a.attr("placeholder");
b.trim(a.val()).length>0||(a.is(":password")?(c=a.attr("id")+"-clone",d=b("<input/>").attr(b.extend(m(this),{type:"text",value:placeholder,"data-password":1,id:c})).addClass("placeholder"),a.before(d).hide(),b("label[for="+a.attr("id")+"]").attr("for",c)):(a.val(placeholder),a.addClass("placeholder")))}var g="placeholder"in f.createElement("input"),h="placeholder"in f.createElement("textarea"),c=":input[placeholder]";b.placeholder={input:g,textarea:h};!i&&g&&h?b.fn.placeholder=function(){}:(!i&&g&&
!h&&(c="textarea[placeholder]"),b.fn.realVal=b.fn.val,b.fn.val=function(){var a=b(this),d;if(arguments.length>0)return a.realVal.apply(this,arguments);d=a.realVal();a=a.attr("placeholder");return d==a?"":d},b.fn.placeholder=function(){this.filter(c).each(k);return this},b(function(a){var b=a(f);b.on("submit","form",l);b.on("focus",c,j);b.on("blur",c,k);a(c).placeholder()}))})(jQuery,document,window.debug);