import { reqOrder, reqPayParams, reqPay } from '../../api/index'
import { wxPay } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取的地址信息
    address: {},
    //获取到的购物车商品信息
    cart: [],
    //总价格
    allprice: 0,
    //总数量
    allCount: 0,
    //获取到的订单信息
    orderNumber: '',
    //获取到的支付参数
    pay: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //支付
  async handlePay () {
    try {
      //1.获取token 没有token就去获取
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
      } else {
        //2.开始创建订单
        //参数
        let order_price = this.data.allprice
        let address = this.data.address
        let consignee_addr = address.provinceName + address.cityName + address.countyName + address.detailInfo
        let goods = []
        let cart = this.data.cart
        cart.forEach((item, index) => {
          goods.push({ goods_id: item.goods_id, goods_number: item.count, goods_price: item.goods_price })
        });
        let params = { order_price, consignee_addr, goods }
        //调用
        const result = await reqOrder(params)
        if (result.meta.status === 200) {
          const { order_number } = result.message
          this.setData({
            orderNumber: order_number
          })
        }
        //3.获取支付参数
        const order_number = this.data.orderNumber
        const result1 = await reqPayParams({ order_number })
        if (result1.meta.status === 200) {
          this.setData({
            pay: result1.message.pay
          })
        }
        //4.调用微信支付api
        // const timeStamp = this.data.pay.timeStamp
        // const nonceStr = this.data.pay.nonceStr
        // const Package = this.data.pay.package
        // const signType = this.data.pay.signType
        // const paySign = this.data.pay.paySign
        // wx.requestPayment({
        //   timeStamp: timeStamp,
        //   nonceStr: nonceStr,
        //   package: Package,
        //   signType: signType,
        //   paySign: paySign,
        //   success: (result2) => {
        //     console.log(result2)
        //   },
        // });

        // const pay = this.data.pay
        // const result2 = await wxPay(pay)
        // console.log(result2)

        //5.查看订单支付状态
        // const result3 = await reqPay({ order_number })
        // console.log(result3)

        //7.支付完成后  删除本地存储中已经支付了的商品   再重新填充到缓存中
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          mask: true,
        });
        let newCart = wx.getStorageSync('cart');
        newCart = newCart.filter((item, index) => {
          return !item.check
        })
        wx.setStorageSync('cart', newCart);
        //6.支付成功跳转到订单页面
        wx.navigateTo({
          url: '/pages/order/index?type=1',
        });
      }
    } catch (error) {
      console.log(error)
    }

  },
  //总数量总价格封装
  total (cart) {
    let allprice = 0
    let allCount = 0
    cart.forEach((item, index) => {
      if (item.check === true) {
        allprice += item.goods_price * item.count
        allCount += item.count
      }
    })
    this.setData({
      cart,
      allprice,
      allCount
    })
  },
  //页面刷新时周期函数
  onShow () {
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    let checkCart = cart.filter(item => item.check)
    //总价格
    //总数量
    // let allprice = 0
    // let allCount = 0
    // cart.length ? cart.forEach((item, index) => {
    //   if (item.check === true) {
    //     allprice += item.goods_price * item.count
    //     allCount += item.count
    //   }
    // }) : 0;

    // this.setData({
    //   address,
    //   cart,
    //   allCheck,
    //   allprice,
    //   allCount
    // })
    this.total(checkCart)
    this.setData({
      address,
    })
  },
})