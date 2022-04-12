module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'furugura.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-furugura',
    action: 'product-furugura',
    description: '',
    chunks: ['product/furugura']
  }]
};
