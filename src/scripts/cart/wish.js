import 'css/cart/cart.css';
import '../_common';

let price = 0;
let wish = null;
$(document).ready(()=> {
  wish = JSON.parse(window.sessionStorage.getItem('wish'));

  if (!wish || !Object.keys(wish).length) {
    $('.jWishNull').removeClass('hidden');
    return;
  }
  $('.jWishList').removeClass('hidden');

  Object.keys(wish).forEach((key) => {
    price += wish[key].quantity * wish[key].price;
  });

  $('.jPrice').text(price);

  Object.keys(wish).forEach((key) => {
    $(`[data-type='${key}']`).removeClass('hidden');
    $(`[data-type='${key}'] .jQuantity`).text(wish[key].quantity);
  });
});

$(document).on('click', '.jCheckAll', (e) => {
  const $this = $(e.currentTarget);
  if (!$this.prop('checked')) {
    $('input[type="checkbox"]').prop('checked', false);
  } else {
    $('input[type="checkbox"]').prop('checked', true);
  }
});

$(document).on('click', 'input[type="checkbox"]:not(.jCheckAll)', (e) => {
  const $this = $(e.currentTarget);
  if (!$this.prop('checked')) {
    $('.jCheckAll').prop('checked', false);
  }
  if ($('input[type="checkbox"]:not(:checked)').length === 1) {
    $('.jCheckAll').prop('checked', true);
  }
});

$(document).on('click', '.jminus', (e) => {
  const $this = $(e.currentTarget);
  const target = $this.parents('li').data('type');

  wish[target].quantity -= 1;
  $this.siblings('.jQuantity').text(wish[target].quantity);
  price -= wish[target].price;
  $('.jPrice').text(price);

  if (wish[target].quantity === 0) {
    delete wish[target];
    $(`[data-type='${target}']`).addClass('hidden');
  }

  if (!Object.keys(wish).length) {
    $('.jWishList').addClass('hidden');
    $('.jWishNull').removeClass('hidden');
  }

  window.sessionStorage.setItem('wish', JSON.stringify(wish));
});

$(document).on('click', '.jAddToCart', () => {
  const cart = JSON.parse(window.sessionStorage.getItem('wish'));

  Object.keys(wish).forEach((key) => {
    if (cart[key]) {
      cart[key].quantity += wish[key];
    } else {
      cart[key] = wish[key];
    }
  });
  window.sessionStorage.setItem('wish', JSON.stringify(cart));
  window.sessionStorage.removeItem('wish');
  $('.jWishList').addClass('hidden');
  $('.jWishNull').removeClass('hidden');
});

$(document).on('click', '.jAdd', (e) => {
  const $this = $(e.currentTarget);
  const target = $this.parents('li').data('type');

  wish = JSON.parse(window.sessionStorage.getItem('wish'));
  wish[target].quantity += 1;
  $this.siblings('.jQuantity').text(wish[target].quantity);
  price += wish[target].price;
  $('.jPrice').text(price);
  window.sessionStorage.setItem('wish', JSON.stringify(wish));
});

let startX = 0;
let startY = 0;
$(document).on('touchstart', '.listItem', (e) => {
  startX = e.originalEvent.changedTouches[0].pageX;
  startY = e.originalEvent.changedTouches[0].pageY;
});

$(document).on('touchmove', '.listItem', (e) => {
  const moveEndX = e.originalEvent.changedTouches[0].pageX;
  const moveEndY = e.originalEvent.changedTouches[0].pageY;
  const X = moveEndX - startX;
  const Y = moveEndY - startY;

  if (Math.abs(X) > Math.abs(Y) && X > 0) {
    $(e.currentTarget).removeClass('active');
  } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    $(e.currentTarget).addClass('active');
  }
});

$(document).on('click', '.jDeleteBtn', (e) => {
  const $this = $(e.currentTarget);
  const target = $this.parents('li').data('type');
  price -= wish[target].quantity * wish[target].price;
  delete wish[target];
  window.sessionStorage.setItem('wish', JSON.stringify(wish));
  $('.jPrice').text(price);
  $this.parents('li').addClass('hidden');

  if (!Object.keys(wish).length) {
    $('.jWishList').addClass('hidden');
    $('.jWishNull').removeClass('hidden');
  }
});
