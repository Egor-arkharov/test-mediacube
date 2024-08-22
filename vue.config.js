const path = require('path');

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/style/global/variables.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
    },
  },
};
