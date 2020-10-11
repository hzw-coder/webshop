import ajax from './ajax'
//基础路径
const BASE_URL = '/api'

//请求方法

//分类数组
export const getCategory = () => ajax(BASE_URL + '/api/category')
//轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual')
//首页商品数据
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist')
//推荐商品数据
export const getRecommendshoplist = (params) => ajax(BASE_URL + '/api/recommendshoplist', params)
//商品详细数据
export const getGoodsDetail = (params) => ajax(BASE_URL + '/api/goodsdetail', params)
//商品评论
export const getGoodsComment = (params) => ajax(BASE_URL + '/api/goodscomment', params)
//获取用户数据
export const getUserInfo = (params) => ajax(BASE_URL + '/api/user_info', params)
//获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {
  phone
})
//验证码登录
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {
  phone,
  code
}, 'POST')
//用户名和密码登录
export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')
// 退出登录
export const getLogout = () => ajax(BASE_URL + '/api/logout')
//管理员登录
export const adminLogin = (account, pwd) => ajax(BASE_URL + '/api/admin_login', {
  account,
  pwd
}, 'POST')
//修改用户信息
export const changeUserInfo = (params) => ajax(BASE_URL + '/api/change_user_msg', params, 'POST')
//修改用户手机
export const changeUserPhone = (id, phone, code) => ajax(BASE_URL + '/api/change_user_phone', {
  id,
  phone,
  code
}, 'POST')
//修改用户密码
export const changeUserPwd = (id, oriPwd, newPwd) => ajax(BASE_URL + '/api/change_user_pwd', {
  id,
  oriPwd,
  newPwd
}, 'POST')
// 管理员退出登录
export const adminLogout = () => ajax(BASE_URL + '/api/admin_logout')
//请求所有商品
export const getAllgoods = () => ajax(BASE_URL + '/api/allgoods')
//管理员删除商品
export const deleteRecomGoods = (goods_id) => ajax(BASE_URL + '/api/delete_recom_goods', {
  goods_id
}, 'POST')
// 修改recommend单个商品
export const changeGoodsInfo = (params) => ajax(BASE_URL + '/api/update_recom_goods', params, 'POST')
//商品上架
export const addGoodsToRecom = (params) => ajax(BASE_URL + '/api/add_shop_recom', params, 'POST')
//获取所有用户信息
export const getAllUsers = () => ajax(BASE_URL + '/api/admin_allusers')
//关键词搜索
export const searchKeywords = (keywords) => ajax(BASE_URL + '/api/searchgoods', {
  keywords
}, 'POST')
//发布评论
export const postComment = (goods_id, comment_detail, comment_rating, user_id) => ajax(BASE_URL + '/api/postcomment', {
  goods_id,
  comment_detail,
  comment_rating,
  user_id
}, 'POST')
//加入购物车
export const addGoodsToCar = (user_id, goods_id, goods_name, thumb_url, price, buy_count, counts) => ajax(BASE_URL + '/api/add_shop_cart', {
  user_id,
  goods_id,
  goods_name,
  thumb_url,
  price,
  buy_count,
  counts
}, 'POST')
//请求购物车数据
export const getCartsGoods = (params) => ajax(BASE_URL + '/api/cart_goods', params)
// 单个商品数量的改变
export const changeGoodsCount = (goods_id, count, user_id) => ajax(BASE_URL + '/api/change_goods_count', {
  goods_id,
  count,
  user_id
}, 'POST')
//删除购物车单个商品
export const deleteGoods = (goods_id, user_id) => ajax(BASE_URL + '/api/delete_goods', {
  goods_id,
  user_id
}, 'POST')
// 删除所有商品
export const deleteAllGoods = (user_id) => ajax(BASE_URL + '/api/delete_all_goods', {
  user_id
}, 'POST')
