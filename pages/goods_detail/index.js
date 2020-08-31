// pages/goods_detail/index.js

import { reqGoodsDetailParams } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: 0,//商品ID
    //筛选后的商品数据
    goodsDetailParams: {},
    isActive: false
  },
  goods: {},//商品数据
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //通过页面栈获取ID
    var curPages = getCurrentPages();
    const options = curPages[curPages.length - 1].options
    this.data.goods_id = options.goods_id
    this.getGoodsDetailParams()
  },
  //获取数据
  async getGoodsDetailParams () {
    const { goods_id } = this.data
    const result = await reqGoodsDetailParams({ goods_id })
    if (result.meta.status === 200) {
      this.goods = result.message
      this.setData({
        // goods: result.message,

        goodsDetailParams: {
          goods_name: result.message.goods_name,
          goods_price: result.message.goods_price,
          goods_introduce: result.message.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: result.message.pics
        }
      })
    }
    let collect = wx.getStorageSync('collect') || []
    let { isActive } = this.data
    let index = collect.findIndex((item, index) => {
      return item.goods_id === this.goods.goods_id
    })
    if (index === -1) {  //说明没被收藏
      isActive = false
    } else {            //说明已被收藏
      isActive = true
    }
    this.setData({
      isActive
    })
  },
  //点击轮播图预览
  bindHandlePreImage (e) {
    const { index } = e.currentTarget.dataset
    const urls = this.data.goodsDetailParams.pics.map((item) => item.pics_mid)
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //添加到购物车
  ChangeCart () {
    // //获取本地数据转换成数组
    // let cart = wx.getStorageSync("cart") || [];
    // //检查本地是否有
    // let index = cart.findIndex((item, i) => {
    //   return item.goods_id === this.goods.goods_id
    // })
    // if (index === -1) {  //本地没有
    //   this.goods.count = 1
    //   cart.push(this.goods)
    // } else { //如果有
    //   cart[index].count++
    // }
    // wx.setStorageSync("cart", cart);
    // wx.showToast({
    //   title: '加入成功',
    //   icon: 'success',
    //   mask: true,
    // });
    const userinfo = wx.getStorageSync('userInfo');
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      //获取本地数据转换成数组
      let cart = wx.getStorageSync("cart") || [];
      //检查本地是否有
      let index = cart.findIndex((item, i) => {
        return item.goods_id === this.goods.goods_id
      })
      if (index === -1) {  //本地没有
        this.goods.count = 1    //数量
        this.goods.check = true   //复选框
        cart.push(this.goods)
      } else { //如果有
        cart[index].count++
      }
      wx.setStorageSync("cart", cart);
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true,
      });
    }

  },
  //收藏商品
  toggleCollect () {
    let { isActive } = this.data
    const collect = wx.getStorageSync('collect') || [];
    const index = collect.findIndex((item, index) => {
      return item.goods_id === this.goods.goods_id
    })
    if (index === -1) {  //没被收藏
      collect.push(this.goods)
      isActive = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    } else {  //已收藏
      collect.splice(index, 1)
      isActive = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }
    this.setData({
      isActive
    })
    wx.setStorageSync('collect', collect);
  }
})