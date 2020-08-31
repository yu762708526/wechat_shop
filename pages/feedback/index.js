// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 1, value: '体验问题', isActive: true },
      { id: 2, value: '商品、商家投诉', isActive: false },
    ],
    //图片
    uPimages: [],
    //文本域的值
    value: '',
    //上传到图片服务器后的图片
    upIma: []
  },
  updataImg: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //获取文本域输入的值
  getText (e) {
    const value = e.detail.value
    this.setData({
      value
    })
  },
  //提交文字和图片
  handleBtn () {
    const { value } = this.data
    const { uPimages } = this.data
    //输入不合法直接return
    if (!value.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return
    }

    //如果文字和图片都有
    if (uPimages.length !== 0) {
      wx.showToast({
        title: '图片正在上传',
        icon: 'none',
        mask: true,
      });
      //合法才开始上传
      uPimages.forEach((item, index) => {
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload',
          filePath: item,
          name: 'image',
          formData: {},
          success: (result) => {
            const data = JSON.parse(result.data).data.url
            const { updataImg } = this
            updataImg.push(data)
            this.setData({
              upIma: updataImg
            })
            //所有图片都上传成功了
            if (index === uPimages.length - 1) {
              wx.hideLoading();
              console.log('把所有文字和图片提交到后台服务器')
              this.setData({
                uPimages: [],
                value: ''
              })
              wx.navigateBack({
                delta: 1
              });
            }
          },
        });
      });
    } else {
      //只提交文字反馈
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }

  },
  //切换tabs
  toggleTabs (e) {
    const i = e.detail.currentIndex
    const tabs = this.data.tabs
    tabs.forEach((item, index) => {
      if (index === i) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    });
    this.setData({
      tabs
    })
  },
  //上传图片
  upImage () {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          uPimages: [...this.data.uPimages, ...result.tempFilePaths]
        })
      },
    });
  },
  //删除图片
  delectImage (e) {
    const index = e.currentTarget.dataset.index
    console.log('image')
    const { uPimages } = this.data
    uPimages.splice(index, 1)
    this.setData({
      uPimages
    })
  },
  delectIcon (e) {
    const index = e.currentTarget.dataset.index
    console.log('icon')
    const { uPimages } = this.data
    uPimages.splice(index, 1)
    this.setData({
      uPimages
    })
  }
})