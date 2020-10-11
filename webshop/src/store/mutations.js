import Vue from 'vue'
import {
  CATEGORY_LIST,
  HOME_CASUAL,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  GOODS_DETAIL,
  GOODS_COMMENT,
  USER_INFO,
  RESET_USER_INFO,
  SEARCH_KEYWORDS,
  CART_GOODS_LIST,
  SELECTED_ALL_GOODS,
  SELECTED_SINGLE_GOODS,
  CHANGE_GOODS_COUNT,
  DEL_SINGLE_GOODS,
  DEL_ALL_GOODS
} from './mutation-types'
export default {
  //首页分类
  [CATEGORY_LIST](state, {
    categoryList
  }) {
    state.categoryList = categoryList
  },
  //购物车数据
  [CART_GOODS_LIST](state, {
    cartgoods
  }) {
    state.cartgoods = cartgoods
  },
  //删除购物车所有商品
  [DEL_ALL_GOODS](state) {
    state.cartgoods = []
  },
  //改变单个商品的数量
  [CHANGE_GOODS_COUNT](state, {
    goods,
    count
  }) {
    const index = state.cartgoods.indexOf(goods)
    state.cartgoods[index].buy_count = count
  },
  //全选商品
  [SELECTED_ALL_GOODS](state, {
    isSelectedAll
  }) {
    state.cartgoods.forEach(item => {
      if (item.checked) {
        //该属性存在
        item.checked = !isSelectedAll
      } else {
        Vue.set(item, 'checked', !isSelectedAll)
      }
    })
  },
  //是否选中单个
  [SELECTED_SINGLE_GOODS](state, {
    goods
  }) {
    const index = state.cartgoods.indexOf(goods)
    if (!goods.checked) { //未选择
      state.cartgoods[index].checked = true
    } else { //已选择
      state.cartgoods[index].checked = !state.cartgoods[index].checked
    }
  },
  //删除购物车中单个商品
  [DEL_SINGLE_GOODS](state, {
    goods
  }) {
    goods.buy_count = 0
    const index = state.cartgoods.indexOf(goods)
    state.cartgoods.splice(index, 1)
  },
  //轮播图
  [HOME_CASUAL](state, {
    homecasual
  }) {
    state.homecasual = homecasual
  },
  //首页商品数据
  [HOME_SHOP_LIST](state, {
    homeshoplist
  }) {
    state.homeshoplist = homeshoplist
  },
  //推荐商品数据
  [RECOMMEND_SHOP_LIST](state, {
    recommendshoplist
  }) {
    state.recommendshoplist = recommendshoplist
  },
  //商品详细信息
  [GOODS_DETAIL](state, {
    goodsDetail
  }) {
    state.goodsDetail = goodsDetail
  },
  //商品评论
  [GOODS_COMMENT](state, {
    goodsComment
  }) {
    state.goodsComment = goodsComment
  },
  //用户数据
  [USER_INFO](state, {
    userInfo
  }) {
    state.userInfo = userInfo
  },
  //清空用户数据
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  //关键词搜索
  [SEARCH_KEYWORDS](state, {
    searchresults
  }) {
    state.searchresults = searchresults
  }
}
