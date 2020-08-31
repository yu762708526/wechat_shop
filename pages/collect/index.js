// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 1, value: '商品收藏', isActive: true },
      { id: 2, value: '品牌收藏', isActive: false },
      { id: 3, value: '店铺收藏', isActive: false },
      { id: 4, value: '浏览足迹', isActive: false },
    ],
    //收藏中的商品
    collect: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collect = wx.getStorageSync('collect');
    this.setData({
      collect
    })
  },
  //切换tabs
  toggleTabs (e) {
    const currentIndex = e.detail.currentIndex
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

  }

})