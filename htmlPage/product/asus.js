module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'asus.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-asus',
    action: 'product-asus',
    description: '',
    chunks: ['product/asus']
  }]
};
