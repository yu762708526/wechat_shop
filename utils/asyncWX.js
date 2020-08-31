export const getSetting = () => {
  return new Promise((resolve, reject) => {
    //用户当前授权状态
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    //获取地址
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    //开启权限
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
//微信支付
export const wxPay = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      // fail: (err) => {
      //   reject(err)
      // },
    });
  })
}




