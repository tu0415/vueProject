// import { get } from "https";

const KEY = "goods"

export const getLocalGoods = () =>{

  return JSON.parse(localStorage.getItem(KEY) || '{}')
}

export const getTotalCount = () =>{
    // 获取本地原先的数据
    const localGoods = getLocalGoods()

    let totalCount = 0

    for(const key in localGoods) {
        totalCount += localGoods[key]
    }
    return totalCount
}

export const addLocalGoods = goods => {
    // console.log("111")
    // console.log(goods)
    // 1. 获取原先本地的数据
    const localGoods = getLocalGoods()

    // 2.处理，判断我传递过来的商品的goodsId是否在本地存在，如果存在，
    //就累加，如果不存在，就新增  
    if(localGoods[goods.goodsId]) {
        localGoods[goods.goodsId] += goods.buyCount
    } else {
        localGoods[goods.goodsId] = goods.buyCount
    }

    // 3. 保存到本地 {87: 4, 88: 2}
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 4. 返回本地最新的商品总数
    return getTotalCount()

}