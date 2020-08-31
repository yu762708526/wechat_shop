import { reqGoodsSearch } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],  //搜索到的商品数据
    valueInput: '', //搜索框中的关键字
    isActive: false, //控制button是否显示

  },
  timer: null, //数据节流


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //输入关键字搜索
  handleInput (e) {
    const value = e.detail.value
    this.setData({
      valueInput: value
    })
    if (this.timer) {  //节流
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      if (value.trim()) {   //有关键字才获取数据
        this.reqGoodsSearch(value)
        this.setData({
          isActive: true
        })
      } else {
        this.setData({
          goods: [],
          isActive: false
        })
      }
    }, 1000);


  },
  //点击取消按钮清除input中文字
  handleButton () {
    this.setData({
      valueInput: '',
      isActive: false,
      goods: []
    })
  },
  //调用接口
  async reqGoodsSearch (query) {
    const result = await reqGoodsSearch({ query })
    if (result.meta.status === 200) {
      this.setData({
        goods: result.message
      })
    }
  }


})