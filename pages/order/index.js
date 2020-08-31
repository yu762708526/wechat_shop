import { reqOrderInfo } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '全部', isActive: true },
      { id: 1, value: '待付款', isActive: false },
      { id: 2, value: '代发货', isActive: false },
      { id: 3, value: '退款/退货', isActive: false }
    ],
    //获取到的订单信息
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow () {
    //检查是否已经有token   没有就去登录界面获取  有就直接调接口
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      //获取历史订单查询
      const pages = getCurrentPages()
      const { options } = pages[pages.length - 1]
      const { type } = options
      console.log(type)
      this.changeTitleTabs(type - 1)      //从我的界面点击不同分类进来  进去不同的界面   //切换tabs功能  二合一
      this.reqOrderInfo(type)         //获取历史订单查询

    }

  },
  //获取历史订单查询
  async reqOrderInfo (type) {
    const result = await reqOrderInfo({ type })
    if (result.meta.status === 200) {
      this.setData({
        //转换时间格式
        orders: result.message.orders.map(item => ({ ...item, create_time_cn: (new Date(item.create_time * 1000).toLocaleString()) }))
      })
    }
  },
  //从我的界面点击不同分类进来  进去不同的界面
  //切换tabs功能  二合一
  changeTitleTabs (currentIndex) {
    const { tabs } = this.data
    tabs.forEach((item, index) => {
      if (index === currentIndex) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    });
    this.setData({
      tabs
    })
  },
  //切换tabs
  toggleTab (e) {
    const currentIndex = e.detail.currentIndex
    this.changeTitleTabs(currentIndex)   //从我的界面点击不同分类进来  进去不同的界面   //切换tabs功能  二合一
    this.reqOrderInfo(currentIndex + 1)   //切换tabs时重新获取数据
  }

})