module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'appleWatch.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-apple watch',
    action: 'product-appleWatch',
    description: '',
    chunks: ['product/appleWatch']
  }]
};
