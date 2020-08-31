const host = 'https://api-hmugo-web.itheima.net'
let ajaxTimes = 0   //每个页面发送请求的次数
/**
 * 封装微信的request
 * form: 'application/x-www-form-urlencoded'
 */
export default function ajax (url, params = {}, method = "GET", contentType = 'json') {
  ajaxTimes++  //每发送一次  就++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: params,
      method: method,
      header: {
        'Authorization': url.includes("/my/") ? wx.getStorageSync('token') : '',
        'Content-Type': contentType.toLowerCase() == 'json' ? "application/json" : "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: (err) => {
        reject(err)
      },
      //数据请求结束关闭 loading 提示框
      complete: () => {
        ajaxTimes--  //每发送完一次 就减减  为0的时候关闭loading提示框
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  });
}
