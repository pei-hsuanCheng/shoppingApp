const htmlPage = require('./htmlPage/home/index.js');
const category = require('./htmlPage/category/category.js');
const appleWatch = require('./htmlPage/product/appleWatch.js');
const jpMouthwash = require('./htmlPage/product/jpMouthwash.js');
const mouthwash = require('./htmlPage/product/mouthwash.js');
const macbook = require('./htmlPage/product/macbook.js');
const milkpowder = require('./htmlPage/product/milkpowder.js');
const sk2 = require('./htmlPage/product/sk2.js');
const furugura = require('./htmlPage/product/furugura.js');
const asus = require('./htmlPage/product/asus.js');
const shoppingCart = require('./htmlPage/cart/shoppingCart.js');
const wish = require('./htmlPage/cart/wish.js');

module.exports = {
  ieVersion: 10, // 10 或 0
  jquery: true,
  tailwindcss: true,
  desktopMinWidth: 1366,
  mobileMaxWidth: 740,
  basicMobileWidth: 375,
  copyStatic: false,
  docker: false,
  https: true,
  rootDirectory: '/',
  component: '_components/',
  container: '_container/',
  js: 'scripts/',
  css: 'assets/css/',
  imgs: 'assets/img/',
  plugins: () => {
    const def = [];
    let publish = def.concat(
      htmlPage.HtmlWebpackPlugin,
      category.HtmlWebpackPlugin,
      appleWatch.HtmlWebpackPlugin,
      jpMouthwash.HtmlWebpackPlugin,
      mouthwash.HtmlWebpackPlugin,
      macbook.HtmlWebpackPlugin,
      milkpowder.HtmlWebpackPlugin,
      furugura.HtmlWebpackPlugin,
      sk2.HtmlWebpackPlugin,
      asus.HtmlWebpackPlugin,
      shoppingCart.HtmlWebpackPlugin,
      wish.HtmlWebpackPlugin
    );

    if (process.env.NODE_ENV === 'production') {
      publish = def.concat(
        htmlPage.HtmlWebpackPlugin,
        category.HtmlWebpackPlugin,
        appleWatch.HtmlWebpackPlugin,
        jpMouthwash.HtmlWebpackPlugin,
        mouthwash.HtmlWebpackPlugin,
        macbook.HtmlWebpackPlugin,
        milkpowder.HtmlWebpackPlugin,
        furugura.HtmlWebpackPlugin,
        sk2.HtmlWebpackPlugin,
        asus.HtmlWebpackPlugin,
        shoppingCart.HtmlWebpackPlugin,
        wish.HtmlWebpackPlugin
      );
    }

    return publish;
  }
};
