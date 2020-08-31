import ajax from './ajax'
export const reqSwiper = () => ajax('/api/public/v1/home/swiperdata', {}, 'GET', 'json')//轮播图
export const reqNavList = () => ajax('/api/public/v1/home/catitems', {}, 'GET', 'json')//导航
export const reqGoodList = () => ajax('/api/public/v1/home/floordata', {}, 'GET', 'json') //楼层
export const reqGoodType = () => ajax('/api/public/v1/categories', {}, 'GET', 'json')  //分类
export const reqGooddetail = ({ query, cid, pagenum, pagesize }) => ajax('/api/public/v1/goods/search', { query, cid, pagenum, pagesize }, 'GET', 'json')  //商品列表搜索
export const reqGoodsDetailParams = ({ goods_id }) => ajax('/api/public/v1/goods/detail', { goods_id }, 'GET', 'json') //商品详情参数
export const reqOrder = ({ order_price, consignee_addr, goods }) => ajax('/api/public/v1/my/orders/create', { order_price, consignee_addr, goods }, 'POST', 'from')  //创建订单
export const reqPayParams = ({ order_number }) => ajax('/api/public/v1/my/orders/req_unifiedorder', { order_number }, 'POST', 'from')  //获取支付参数
export const reqPay = ({ order_number }) => ajax('/api/public/v1/my/orders/chkOrder', { order_number }, 'POST', 'from')  //查看订单支付状态
export const reqOrderInfo = ({ type }) => ajax('/api/public/v1/my/orders/all', { type }, 'GET', 'json')  //历史订单查询
export const reqGoodsSearch = ({ query }) => ajax('/api/public/v1/goods/qsearch', { query }, 'GET', 'json')  //搜索商品
