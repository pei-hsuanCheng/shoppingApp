module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'mouthwash.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-黑人漱口水',
    action: 'product-mouthwash',
    description: '',
    chunks: ['product/mouthwash']
  }]
};
