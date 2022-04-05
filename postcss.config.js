const CONFIG = require('./config.js');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-assets')({
      loadPaths: [`src/${CONFIG.imgs}`, `src/${CONFIG.svgs}`]
    }),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-calc'),
    require('postcss-color-rgba-fallback'), // IE11 support color variable
    require('postcss-hexrgba'),
    require('postcss-pxtorem')({
      propList: ['*', '!text-shadow', '!box-shadow'],
      minPixelValue: 1
    }),
    require('autoprefixer')({
      grid: true,
      overrideBrowserslist: [
        '> 1%',
        'last 5 versions',
        'Firefox >= 45',
        'ios >= 8',
        'ie >= 10'
      ]
    })
  ]
};
