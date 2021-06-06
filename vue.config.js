// 自己创建一个 js 文件，用于设置路径别名，使用 module.exports，
  // 会自动和 node_modules 中的配置文件合并
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views"
      }
    }
  }
}