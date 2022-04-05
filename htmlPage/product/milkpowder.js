module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'milkpowder.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-克寧奶粉',
    action: 'product-milkpowder',
    description: '',
    chunks: ['product/milkpowder']
  }]
};
