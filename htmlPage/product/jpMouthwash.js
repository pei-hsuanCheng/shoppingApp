module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'jpMouthwash.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-日本漱口水',
    action: 'product-jpMouthwash',
    description: '',
    chunks: ['product/jpMouthwash']
  }]
};
