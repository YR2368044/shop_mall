module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      // viewportWidth: 375, // 视窗的宽度，对应设计稿的宽度(设计稿：iPhone6(750*1334))
      // viewportHeight: 667, // 视窗的高度，对应设计稿的高度(可以不配置)
      unitPrecision: 5, // 指定 "px" 转换为视窗单位值的小数单位(很多时候无法整除)
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用 vw
      // selectorBlackList: ["ignore", "tab-bar"], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于 "1px" 不转换为视窗单位
      mediaQuery: false, // 允许媒体查询中转换 "px"
      // exclude: [/TabBar/] // 匹配文件，使其不被转化，必须使用正则表达式
    }
  }
}