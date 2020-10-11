import {
  getCategory,
  getHomeCasual,
  getHomeShopList,
  getRecommendshoplist,
  getGoodsDetail,
  getGoodsComment,
  getUserInfo,
  getLogout,
  searchKeywords,
  getCartsGoods,
  changeGoodsCount,
  deleteGoods,
  deleteAllGoods
} from '../api'

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
} from './mutation-types.js'

export default {
  //获取分类数组
  async reqCategory({
    commit
  }) {
    const result = await getCategory()
    commit(CATEGORY_LIST, {
      categoryList: result.message
    })
  },
  //请求购物车数据
  async reqCartsGoods({
    commit
  }, params) {
    const result = await getCartsGoods(params)
    commit(CART_GOODS_LIST, {
      cartgoods: result.message
    })
  },
  //是否全选
  selectedAll({
    commit
  }, {
    isSelectedAll
  }) {
    commit(SELECTED_ALL_GOODS, {
      isSelectedAll
    })
  },
  //是否选中单个
  singleSelected({
    commit
  }, {
    goods
  }) {
    commit(SELECTED_SINGLE_GOODS, {
      goods
    })
  },
  //单个商品的改变
  async updateGoodsCount({
    commit
  }, {
    goods,
    count,
    user_id
  }) {
    const result = await changeGoodsCount(goods.goods_id, count, user_id)
    commit(CHANGE_GOODS_COUNT, {
      goods,
      count
    })
  },
  //删除购物车单个商品
  async delSingleGoods({
    commit
  }, {
    goods,
    user_id
  }) {
    const result = await deleteGoods(goods.goods_id, user_id)
    commit(DEL_SINGLE_GOODS, {
      goods
    })
  },
  //清空购物车
  async delAllGoods({
    commit
  }, {
    user_id
  }) {
    const result = await deleteAllGoods(user_id)
    commit(DEL_ALL_GOODS)
  },

  //关键词搜索
  async reqSearch({
    commit
  }, {
    keywords
  }) {
    const result = await searchKeywords(keywords)
    commit(SEARCH_KEYWORDS, {
      searchresults: result.message
    })
  },

  //获取轮播图数据
  async reqHomeCasual({
    commit
  }) {
    const result = await getHomeCasual()
    commit(HOME_CASUAL, {
      homecasual: result.message
    })
  },
  //首页商品数据
  async reqHomeShopList({
    commit
  }) {
    const result = await getHomeShopList()
    commit(HOME_SHOP_LIST, {
      homeshoplist: result.message
    })
  },
  //推荐商品数据
  async reqRecommendshoplist({
    commit
  }, params) {
    const result = await getRecommendshoplist(params)
    commit(RECOMMEND_SHOP_LIST, {
      recommendshoplist: result.message
    })
  },
  //商品详细数据
  async reqGoodsDetail({
    commit
  }, params) {
    const result = await getGoodsDetail(params)
    commit(GOODS_DETAIL, {
      goodsDetail: result.message
    })
  },
  //商品评论
  async reqGoodsComment({
    commit
  }, params) {
    const result = await getGoodsComment(params)
    commit(GOODS_COMMENT, {
      goodsComment: result.message
    })
  },
  //异步获取用户信息
  async reqUserInfo({
    commit
  }, params) {
    let userInfo = {};
    const result = await getUserInfo(params);
    if (result.success_code === 200) {
      userInfo = result.message;
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    }
    commit(USER_INFO, {
      userInfo
    });
  },
  //同步用户信息
  syncUserInfo({
    commit
  }, userInfo) {
    commit(USER_INFO, {
      userInfo
    })
  },
  //退出登录
  async LogOut({
    commit
  }) {
    const result = await getLogout()
    if (result.success_code === 200) {
      commit(RESET_USER_INFO)
    }
  }
}
