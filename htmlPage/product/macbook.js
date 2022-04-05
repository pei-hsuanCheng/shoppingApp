module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'macbook.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-macbook',
    action: 'product-macbook',
    description: '',
    chunks: ['product/macbook']
  }]
};
