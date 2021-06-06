import {request} from './request'

export function getDetail(iid){
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url: "/recommend"
  })
}

// 服务器返回的数据过多，可能很杂乱，先整合数据再展示，
  // 定义一个封装数据的类(构造函数)，随后使用 new 直接调用即可

// 商品信息
export class Goods{
  constructor(itemInfo, columns, services){ // 调用时传的参数
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

// 商家信息
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

// 详情页参数信息
export class GoodsParam{
  constructor(info, rule){
    // 注：images 可能没有值(有的商品有，有的没有)
    this.image = info.image ? info.images[0] : ""
    this.infos = info.set
    this.sizes = rule.tables
  }
}