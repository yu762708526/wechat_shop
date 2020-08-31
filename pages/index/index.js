//Page Object
import { reqSwiper, reqNavList, reqGoodList } from '../../api/index'
Page({
  data: {
    // 轮播图
    swiperList: [],
    // 导航
    navList: [],
    //楼层
    goodList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiper()
    this.getNavList()
    this.getGoodList()
  },
  // 获取轮播图数据
  async getSwiper () {
    const result = await reqSwiper()
    // console.log(result)
    if (result.meta.status === 200) {
      this.setData({
        swiperList: result.message
      })
    }

  },
  // 获取导航数据
  async getNavList () {
    const result = await reqNavList()
    // console.log(result)
    if (result.meta.status === 200) {
      this.setData({
        navList: result.message
      })
    }
  },
  //获取楼层数据
  async getGoodList () {
    let newGoods = []
    const result = await reqGoodList()
    if (result.meta.status === 200) {
      newGoods = result.message   //替换路径  为了首页跳转  
      newGoods.forEach((item, index) => {
        item.product_list.forEach((item, index) => {
          item.navigator_url = item.navigator_url.replace('?', "/index?")
        })
      });
      this.setData({
        goodList: newGoods
      })
    }
  },
  // onReady: function () {  

  // }, 
  // onShow: function () {

  // },
  // onHide: function () {

  // },
  // onUnload: function () {

  // },
  // onPullDownRefresh: function () {

  // },
  // onReachBottom: function () {

  // },
  // onShareAppMessage: function () {

  // },
  // onPageScroll: function () {

  // },
  // //item(index,pagePath,text)
  // onTabItemTap: function (item) {

  // }
});