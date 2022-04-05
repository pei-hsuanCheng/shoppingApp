module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'wish.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-心願清單',
    action: 'cart-wish',
    description: '',
    chunks: ['cart/wish']
  }]
};
