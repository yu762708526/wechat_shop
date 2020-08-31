// pages/goods_list/index.js
import { reqGooddetail } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false },
    ],
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
    goodListDetail: [] //商品详情数据
  },
  totalPagenum: 1,  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.data.cid = options.cid || ''
    this.data.query = options.query || ''
    this.getGoodList()

  },

  //获取商品列表数据
  async getGoodList () {
    const { query, cid, pagenum, pagesize } = this.data

    const result = await reqGooddetail({ query, cid, pagenum, pagesize })
    if (result.meta.status === 200) {
      const total = result.message.total
      this.totalPagenum = Math.ceil(total / pagesize)
      this.setData({
        goodListDetail: [...this.data.goodListDetail, ...result.message.goods]
      })
      //当处理完数据刷新后，停止当前页面的下拉刷新。
      wx.stopPullDownRefresh()

    }


  },
  //切换导航
  parentChangeTab (e) {
    // console.log(e)
    let index = e.detail.currentIndex
    const tabs = this.data.tabs
    tabs.forEach((item, i) => {
      i === index ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  },
  //上拉触底函数
  onReachBottom () {
    if (this.data.pagenum >= this.totalPagenum) {
      // console.log('没有下一页')
      wx.showToast({
        title: '已经到底了'
      });
    } else {
      // console.log('有下一页')
      this.data.pagenum++
      this.getGoodList()
    }
  },
  //下拉刷新函数
  onPullDownRefresh () {
    this.data.goodListDetail = []
    this.data.pagenum = 1
    this.getGoodList()
  }
})