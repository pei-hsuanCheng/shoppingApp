module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'shoppingCart.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-購物清單',
    action: 'cart-shoppingCart',
    description: '',
    chunks: ['cart/shoppingCart']
  }]
};
