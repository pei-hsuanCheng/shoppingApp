module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'sk2.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-SK-ll',
    action: 'product-sk2',
    description: '',
    chunks: ['product/sk2']
  }]
};
