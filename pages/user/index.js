// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取到的用户信息
    userInfo: {},
    //收藏的商品
    collect: {},
    //有token才能去订单
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //前往订单
  goOrder () {
    const token = this.data.token
    if (token) {
      wx.navigateTo({
        url: '/pages/order/index?type=1',
      });
    } else {
      wx.showToast({
        title: '你还没购买商品',
        icon: 'none',
        mask: true,
      });
    }
  },
  //前往待付款
  goPay () {
    const token = this.data.token
    if (token) {
      wx.navigateTo({
        url: '/pages/order/index?type=2',
      });
    } else {
      wx.showToast({
        title: '你还没购买商品',
        icon: 'none',
        mask: true,
      });
    }
  },
  //前往待收获
  goGetGoods () {
    const token = this.data.token
    if (token) {
      wx.navigateTo({
        url: '/pages/order/index?type=3',
      });
    } else {
      wx.showToast({
        title: '你还没购买商品',
        icon: 'none',
        mask: true,
      });
    }
  },
  onShow () {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect');
    const token = wx.getStorageSync('token')
    this.setData({
      userInfo,
      collect,
      token
    })
  },


})