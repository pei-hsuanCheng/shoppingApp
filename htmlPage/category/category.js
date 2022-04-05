module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'category.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-分類商品',
    action: 'category',
    description: '',
    chunks: ['category/category']
  }]
};
