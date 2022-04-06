import 'css/cart/cart.css';
import { addProduct } from '../_common';

let price = 0;
let cart = null;
let addToBuy = [];
$(document).ready(()=> {
  cart = JSON.parse(window.sessionStorage.getItem('cart'));

  if (!cart || !Object.keys(cart).length) {
    $('.jCartNull').removeClass('hidden');
    return;
  }

  $('.jCartList').removeClass('hidden');

  Object.keys(cart).forEach((key) => {
    price += cart[key].quantity * cart[key].price;
  });

  $('.jPrice').text(price);

  Object.keys(cart).forEach((key) => {
    $(`[data-type='${key}']`).removeClass('hidden');
    $(`[data-type='${key}'] .jQuantity`).text(cart[key].quantity);
    addToBuy.push(key);
  });
});

$(document).on('click', '.jCheckAll', (e) => {
  const $this = $(e.currentTarget);
  if (!$this.prop('checked')) {
    $('input[type="checkbox"]').prop('checked', false);
    addToBuy = [];
  } else {
    $('input[type="checkbox"]').prop('checked', true);
    addToBuy = [];
    Object.keys(cart).forEach((key) => {
      addToBuy.push(key);
    });
  }
});

$(document).on('click', 'input[type="checkbox"]:not(.jCheckAll)', (e) => {
  const $this = $(e.currentTarget);
  if (!$this.prop('checked')) {
    $('.jCheckAll').prop('checked', false);
    addToBuy.splice(addToBuy.indexOf($this.data('type')), 1);
  } else {
    addToBuy.push($this.data('type'));
  }
  if (addToBuy.length === Object.keys(cart).length) {
    $('.jCheckAll').prop('checked', true);
  }
});

$(document).on('click', '.jminus', (e) => {
  const $this = $(e.currentTarget);
  const target = $this.parents('li').data('type');

  cart[target].quantity -= 1;
  $this.siblings('.jQuantity').text(cart[target].quantity);
  price -= cart[target].price;
  $('.jPrice').text(price);

  if (cart[target].quantity === 0) {
    delete cart[target];
    $(`[data-type='${target}']`).addClass('hidden');
    addToBuy.splice(addToBuy.indexOf(target), 1);
  }

  if (!Object.keys(cart).length) {
    $('.jCartList').addClass('hidden');
    $('.jCartNull').removeClass('hidden');
  }

  window.sessionStorage.setItem('cart', JSON.stringify(cart));
});

$(document).on('click', '.jAdd', (e) => {
  const $this = $(e.currentTarget);
  const target = $this.parents('li').data('type');
  addProduct(target);
  cart = JSON.parse(window.sessionStorage.getItem('cart'));
  $this.siblings('.jQuantity').text(cart[target].quantity);
  price += cart[target].price;
  $('.jPrice').text(price);
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
  price -= cart[target].quantity * cart[target].price;
  delete cart[target];
  addToBuy.splice(addToBuy.indexOf(target), 1);
  window.sessionStorage.setItem('cart', JSON.stringify(cart));
  $('.jPrice').text(price);
  $this.parents('li').addClass('hidden');

  if (!Object.keys(cart).length) {
    $('.jCartList').addClass('hidden');
    $('.jCartNull').removeClass('hidden');
  }
});
