module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'index.html',
    template: '_shared/layout.ejs',
    title: '電商購物平台-首頁',
    action: 'index',
    description: '',
    chunks: ['home/index']
  }]
};
