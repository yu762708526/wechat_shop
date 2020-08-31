// 1 获取用户的收货地址
//   1 绑定点击事件
//   2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

//   2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
//     1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
//       scope 值 true 直接调用 获取收货地址
//     2 假设 用户 从来没有调用过 收货地址的api 
//       scope undefined 直接调用 获取收货地址
//     3 假设 用户 点击获取收货地址的提示框 取消   
//       scope 值 false 
//       1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
//       2 获取收货地址
//     4 把获取到的收货地址 存入到 本地存储中 
// 2 页面加载完毕
//   0 onLoad  onShow 
//   1 获取本地存储中的地址数据
//   2 把数据 设置给data中的一个变量
// 3 onShow 
//   0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
//     1 num=1;
//     2 checked=true;
//   1 获取缓存中的购物车数组
//   2 把购物车数据 填充到data中
// 4 全选的实现 数据的展示
//   1 onShow 获取缓存中的购物车数组
//   2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
// 5 总价格和总数量
//   1 都需要商品被选中 我们才拿它来计算
//   2 获取购物车数组
//   3 遍历
//   4 判断商品是否被选中
//   5 总价格 += 商品的单价 * 商品的数量
//   5 总数量 +=商品的数量
//   6 把计算后的价格和数量 设置回data中即可
// 6 商品的选中
//   1 绑定change事件
//   2 获取到被修改的商品对象
//   3 商品对象的选中状态 取反
//   4 重新填充回data中和缓存中
//   5 重新计算全选。总价格 总数量。。。
// 7 全选和反选
//   1 全选复选框绑定事件 change
//   2 获取 data中的全选变量 allChecked
//   3 直接取反 allChecked=!allChecked
//   4 遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
//   5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中 
// 8 商品数量的编辑
//   1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 
//     1 “+” "+1"
//     2 "-" "-1"
//   2 传递被点击的商品id goods_id
//   3 获取data中的购物车数组 来获取需要被修改的商品对象
//   4 当 购物车的数量 =1 同时 用户 点击 "-"
//     弹窗提示(showModal) 询问用户 是否要删除
//     1 确定 直接执行删除
//     2 取消  什么都不做 
//   4 直接修改商品对象的数量 num
//   5 把cart数组 重新设置回 缓存中 和data中 this.setCart
// 9 点击结算
//   1 判断有没有收货地址信息
//   2 判断用户有没有选购商品
//   3 经过以上的验证 跳转到 支付页面！ 
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取的地址信息
    address: {},
    //获取到的购物车商品信息
    cart: [],
    //是否全选
    allCheck: false,
    //总价格
    allprice: 0,
    //总数量
    allCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //改变单个商品的复选框
  changeCheck (e) {
    let id = e.currentTarget.dataset.id
    let cart = this.data.cart
    let index = cart.findIndex((item, index) => {
      return item.goods_id === id
    })
    cart[index].check = !cart[index].check
    wx.setStorageSync('cart', cart);
    //是否全选
    let allCheck = cart.every((item) => {
      return item.check === true
    })
    //以下封装
    // let allprice = 0
    // let allCount = 0
    // cart.length ? cart.forEach((item, index) => {
    //   if (item.check === true) {
    //     allprice += item.goods_price * item.count
    //     allCount += item.count
    //   }
    // }) : 0;
    // this.setData({
    //   cart,
    //   allCheck,
    //   allprice,
    //   allCount
    // })
    this.setData({
      allCheck
    })
    this.total(cart)
  },
  //改变全选复选框
  changeAllcheck () {
    let allCheck = this.data.allCheck
    let cart = this.data.cart
    allCheck = !allCheck
    cart.forEach((item, index) => {
      item.check = allCheck
    })
    // let allprice = 0
    // let allCount = 0
    // cart.length ? cart.forEach((item, index) => {
    //   if (item.check === true) {
    //     allprice += item.goods_price * item.count
    //     allCount += item.count
    //   }
    // }) : 0
    // wx.setStorageSync('cart', cart);
    // this.setData({
    //   allCheck,
    //   cart,
    //   allprice,
    //   allCount
    // })
    this.setData({
      allCheck
    })
    this.total(cart)
  },
  //总数量总价格封装
  total (cart) {
    let allprice = 0
    let allCount = 0
    cart.length ? cart.forEach((item, index) => {
      if (item.check === true) {
        allprice += item.goods_price * item.count
        allCount += item.count
      }
    }) : 0
    wx.setStorageSync('cart', cart);
    this.setData({
      cart,
      allprice,
      allCount
    })
  },
  //商品数量的增加和减少
  lowCount (e) {
    let id = e.currentTarget.dataset.id   //商品id
    let ope = e.currentTarget.dataset.operation  //区分加或减
    let cart = this.data.cart
    let allCheck = this.data.allCheck
    let index = cart.findIndex((item, index) => {
      return item.goods_id === id
    })
    if (ope) { //增加
      cart[index].count++
    } else {  //减少
      if (cart[index].count > 1) {  //count大于1才能减少
        cart[index].count--
      } else {  //count小于等于1  减少就是直接删除
        wx.showModal({
          title: '提示',
          content: '确定要删除商品吗',
          success: (res) => {
            if (res.confirm) {
              cart.splice(index, 1)
              if (cart.length === 0) {  //如果购物车中的商品清空了  那么全选框取消
                allCheck = false
                this.setData({
                  allCheck
                })
              }
              // let allprice = 0
              // let allCount = 0
              // cart.forEach((item, index) => {
              //   if (item.check === true) {
              //     allprice += item.goods_price * item.count
              //     allCount += item.count
              //   }
              // })
              // wx.setStorageSync('cart', cart);
              // this.setData({
              //   cart,
              //   allprice,
              //   allCount
              // })
              this.total(cart)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    }
    this.total(cart)
  },
  //结算功能
  handPay () {
    let address = this.data.address
    let allCount = this.data.allCount
    if (address.length === 0) {   //如果没有添加地址信息
      wx.showToast({
        title: '请添加地址信息',
        icon: 'none',
      })
    } else if (allCount === 0) {   //如果没有添加商品 
      wx.showToast({
        title: '请选购商品',
        icon: 'none',
      })
    } else {
      wx.navigateTo({
        url: '/pages/pay/index',
      });
    }
  },
  //页面刷新时周期函数
  onShow () {
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    //是否全选
    let allCheck = cart.length ? cart.every((item) => {
      return item.check === true
    }) : false
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
    this.total(cart)
    this.setData({
      address,
      allCheck
    })
  },
  //收货地址
  async handleGetAddress () {
    //用户当前授权状态
    // wx.getSetting({
    //   success: (result) => {
    //     let currentPower = result.authSetting['scope.address']
    //     //获取权限状态  有权限获取第一个获取时  直接可以得到地址
    //     if (currentPower === true || currentPower === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //         },
    //       });
    //     } else {
    //       //没有权限时开启权限
    //       wx.openSetting({
    //         success: (result2) => {
    //           //开启权限后获取地址
    //           wx.chooseAddress({
    //             success: (result3) => {
    //             },
    //           });
    //         },
    //       });
    //     }
    //   },
    // });

    try {
      //获取用户当前授权状态
      const result = await getSetting()
      let currentPower = result.authSetting['scope.address']

      //获取权限状态  有权限获取第一个获取时  直接可以得到地址
      // if (currentPower === true || currentPower === undefined) {
      //   const result1 = await chooseAddress()
      //   console.log(result1)
      // } else {
      //   //没有权限时开启权限
      //   await openSetting()
      //   //开启权限后获取地址
      //   const result2 = await chooseAddress()
      //   console.log(result2)
      // }

      if (currentPower === false) {
        //没有权限时开启权限
        await openSetting()
      }
      //开启权限后获取地址
      const result2 = await chooseAddress()
      wx.setStorageSync('address', result2);
      console.log(result2)
    } catch (error) {
      console.log(error)
    }

  }
})