module.exports = {
  // confingureWebpack代表配置webpack
  configureWebpack: {
    resolve: {
      // extensions是添加后以后含有这些后缀的后缀名可写可不写 这里我没有配置
      // extension: [],
      alias: {
        // 内部配置过了
        //  '@': resolve('src')
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
        // router和store可以通过this.$router和this.$store获取 所以暂时不设置路径别名
      }
    }
  },
}
