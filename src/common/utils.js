// 防抖函数
export function debounce(func, delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer) 
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// date 的格式化
export function formatDate(date, fmt){
  // 正则表达式是什么？-> 字符串匹配利器 
  // 1.获取年份 
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 就是匹配到的年份字符串，可能有 1/2/3/4 个 y
    // number 和 string 相加直接转换成一个string，再做一个字符串的截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  let o = {
    // 2.获取 月/日/时/分/秒
    "M+": date.getMonth() + 1, // M 表示月，m 表示分钟
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for(let k in o){
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str){
  return ("00" + str).substr(str.length)
}