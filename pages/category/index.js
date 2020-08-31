// pages/category/index.js
import { reqGoodType } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //左侧数据
    listMenu: [],
    //右侧数据
    listType: [],
    //选中激活
    current: 0,
    //右侧滚动条距离顶部的位置
    scrollTop: 0
  },
  // 商品分类
  goodType: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goodType = wx.getStorageSync('goodType');
    //本地没有数据就重新发送
    if (!goodType) {
      this.getGoodType()
    } else {
      //有数据检查是否过期
      if (Date.now() - goodType.time > 1000 * 10) {
        this.getGoodType()
        //没过期就使用本地数据  重新渲染一遍
      } else {
        this.goodType = goodType.data
        let listMenu = []
        this.goodType.forEach(item => {
          listMenu.push(item.cat_name)
        });
        let listType = this.goodType[0].children
        this.setData({
          listMenu: listMenu,
          listType: listType,

        })
      }
    }
  },
  //商品分类
  async getGoodType () {
    const result = await reqGoodType()
    if (result.meta.status === 200) {

      this.goodType = result.message
      //存入本地
      wx.setStorageSync('goodType', { time: Date.now(), data: this.goodType });
      let listMenu = []
      this.goodType.forEach(item => {
        listMenu.push(item.cat_name)
      });
      let listType = this.goodType[0].children
      this.setData({
        listMenu: listMenu,
        listType: listType,

      })

    }

  },
  //切换列表
  toggleItem (e) {
    let listType = this.goodType[e.currentTarget.dataset.index].children
    this.setData({
      listType: listType,
      current: e.currentTarget.dataset.index,
      //右侧每次切换时滚动条距离顶部都变为0
      scrollTop: 0
    })
  }
})