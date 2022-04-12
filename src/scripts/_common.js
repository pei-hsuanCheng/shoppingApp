import LazyLoad from 'vanilla-lazyload';
import { prjs } from '_factory.js';
import productInfo from './products.js';

let lazyLoadFun = () => {
  return new LazyLoad({
    elements_selector: '.lazy',
    use_native: true
  });
};

/* 一次載入使用到的 svg */

prjs.$d.on('ready', () => {
  lazyLoadFun();
});

// eslint-disable-next-line no-unused-vars
let cart = null;
// eslint-disable-next-line no-unused-vars
let wish = null;
const nowProduct = window.location.pathname.split('/').reverse()[0].replace('.html', '');

function getCart() {
  let box = JSON.parse(window.sessionStorage.getItem('cart'));
  box = box || {};

  let quantity = 0;
  Object.keys(box).forEach((key) => {
    quantity += box[key].quantity;
  });

  return { quantity, box };
}

function getWish(target) {
  let box = JSON.parse(window.sessionStorage.getItem('wish'));
  box = box || {};

  return { box, alive: box[target] };
}

export const addProduct = (target) => {
  const newTarget = target || nowProduct;
  if (cart[newTarget]) {
    cart[newTarget].quantity += 1;
  } else {
    cart[newTarget] = { ...productInfo[newTarget] };
  }
  let quantity = 0;
  Object.keys(cart).forEach((key) => {
    quantity += cart[key].quantity;
  });
  window.sessionStorage.setItem('cart', JSON.stringify(cart));

  return quantity;
};

function addWishProduct() {
  if (wish[nowProduct]) {
    delete wish[nowProduct];
  } else {
    wish[nowProduct] = { ...productInfo[nowProduct] };
  }

  window.sessionStorage.setItem('wish', JSON.stringify(wish));
}

$(window).on('pageshow', () => {
  const { quantity: cartQuant, box: cartList } = getCart();
  const { box: wishList, alive } = getWish(nowProduct);
  cart = cartList;
  wish = wishList;
  try {
    document.querySelector('.iconCart').dataset.type = cartQuant;

    if (cartQuant > 0) {
      $('.jAddCart').addClass('active');
    } else {
      $('.jAddCart').removeClass('active');
    }
    if (alive) {
      $('.jAddWish').addClass('active');
    } else {
      $('.jAddWish').removeClass('active');
    }
  } catch (e) {
    console.log('not product page');
  }
});

$(document).ready(() => {
  $('.jMenuCtrl').click(()=>{
    $('.jMenu').toggleClass('show');
  });

  const { quantity: cartQuant, box: cartList } = getCart();
  const { box: wishList, alive } = getWish(nowProduct);
  cart = cartList;
  wish = wishList;

  try {
    document.querySelector('.iconCart').dataset.type = cartQuant;

    if (cartQuant > 0) $('.jAddCart').addClass('active');
    if (alive) $('.jAddWish').addClass('active');
  } catch (e) {
    console.log('not product page');
  }
});

$(document).on('click', '.jBack', () => window.history.go(-1));

$(document).on('click', '.jAddCart', () => {
  if (!$('.iconCart').hasClass('active')) {
    $('.iconCart').addClass('active');
  }

  $('.jpopup').addClass('anim');

  const quantity = addProduct();
  document.querySelector('.iconCart').dataset.type = quantity;
});

$(document).on('click', '.jAddWish', (e) => {
  const $this = $(e.currentTarget);
  $this.toggleClass('active');
  addWishProduct();
});

$(document).on('keypress', '.jSearch', (e) => {
  const keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode !== 13) return;

  const $this = $(e.currentTarget);
  const val = $this.val();
  if (val.search(/克寧|生乳|奶粉/) < 0) return;
  window.location.href = 'milkpowder.html';
});

$(document).on('click', () => {
  $('.activeBtn').addClass('anim');
  const timer = setTimeout(()=> {
    $('.activeBtn').removeClass('anim');
    clearTimeout(timer);
  }, 800);
});

$(document).on('click', '.activeBtn', (e) => {
  e.stopPropagation();
});
