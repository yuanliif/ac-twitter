const path = require('path')

module.exports = {
  chainWebpack: config => {
    // 自訂網站標題: https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin

    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Simple Twitter'
        return args
      })

    // 在Vue中使用SVG: https://ithelp.ithome.com.tw/articles/10230334
    config.module.rules.delete('svg')

    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-icon-[name]' })

    config.module
      .rule('images')
      .exclude.add(path.resolve('src/assets/icons'))
  }
//   },
//   // 設定CSS全域變數: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
//   css: {
//     loaderOptions: {
//       scss: {
//         additionalData: '@import "~@/styles/config.scss";'
//       }
//     }
//   }
}
