<template>
  <div id="shopcar">
    <div id="content">
      <div class="header">
        <span>购物车</span>
      </div>
      <div class="cont_title">
        <span>全部商品</span>
      </div>
      <div class="cont_op">
        <div class="con_selet">
          <input
            type="checkbox"
            class="con_selectAll"
            :checked="isSelectedAll"
            @click.stop="selectedAll(isSelectedAll)"
          />
          <label for="con_selectAll">全选</label>
        </div>
        <div>商品信息</div>
        <div>单价</div>
        <div>数量</div>
        <div>金额</div>
        <div>操作</div>
      </div>
      <div class="pro_box" v-if="cartgoods.length">
        <div class="goods" v-for="(goods, index) in cartgoods" :key="index">
          <ul class="item_content">
            <li class="td td-chk">
              <div>
                <input
                  type="checkbox"
                  class="checkBox"
                  :checked="goods.checked"
                  @click="singleSelected(goods)"
                />
              </div>
            </li>
            <li class="td td-item">
              <div class="td-item-pic">
                <img :src="goods.thumb_url" />
              </div>
              <div class="td-item-info">{{ goods.goods_name }}</div>
            </li>
            <li class="td td-price">
              <strong>{{ (goods.price / 100) | moneyFormat }}</strong>
            </li>
            <li class="td td-amount">
              <div class="item-amout">
                <el-input-number
                  v-model="goods.buy_count"
                  :min="1"
                  :max="goods.counts"
                  @change="updateGoodsCount(goods, goods.buy_count)"
                ></el-input-number>
              </div>
            </li>
            <li class="td td-sum">
              <strong>{{
                ((goods.buy_count * goods.price) / 100) | moneyFormat
              }}</strong>
            </li>
            <li class="td td-op"><a @click="clickTrash(goods)">删除</a></li>
          </ul>
        </div>
      </div>
      <div class="pro_box" v-else>购物车里空空如也</div>
    </div>
    <div id="footer">
      <div class="foot_select">
        <input
          type="checkbox"
          class="foot_selectAll"
          name="foot_selectAll"
          :checked="isSelectedAll"
          @click.stop="selectedAll(isSelectedAll)"
        />
        <label for="foot_selectAll">全选</label>
      </div>
      <div class="foot_op">
        <a class="foot_remove" @click.prevent="emptyCart">清空购物车</a>
      </div>
      <div class="foot_total">
        <div class="amout-sum">
          <span class="txt">已选商品</span>
          <strong id="selected_amout">{{ totalAmount }}</strong>
          <span class="txt">件</span>
        </div>
        <div class="price-sum">
          <span class="txt">合计（不含运费）：</span>
          <strong class="selected_price">{{
            totalPrice | moneyFormat(totalPrice)
          }}</strong>
        </div>
        <div class="btn-area">
          <a class="btn-sumbit" :class="{ 'btn-allow': totalAmount }"
            >结&nbsp;算</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "shopcar",
  data() {
    return {
      isSelectedAll: false, //全选的标志
      totalAmount: 0, //已选数量
      totalPrice: 0, //总价
      //currentDelGoods: {}, //当前商品
    };
  },
  computed: {
    ...mapState(["cartgoods", "userInfo"]),
  },
  mounted() {
    let user_id = this.userInfo.id;
    this.$store.dispatch("reqCartsGoods", { user_id });
  },
  methods: {
    //全选
    selectedAll(isSelectedAll) {
      this.isSelectedAll = !isSelectedAll;
      this.$store.dispatch("selectedAll", { isSelectedAll });
      //计算商品总价
      this.getAllGoodsPrice();
      //全选与否
      this.hasSelectedAll();
    },
    //计算商品总价
    getAllGoodsPrice() {
      let totalPrice = 0;
      this.cartgoods.forEach((item, index) => {
        if (item.checked) {
          totalPrice += (item.price / 100) * item.buy_count;
        }
      });
      this.totalPrice = totalPrice;
    },
    //单选与否
    singleSelected(goods) {
      this.$store.dispatch("singleSelected", { goods });
      //是否全选中
      this.hasSelectedAll();
      //总价
      this.getAllGoodsPrice();
    },

    //是否全选中
    hasSelectedAll() {
      let flag = true;
      let totalNum = 0;
      this.cartgoods.forEach((item, index) => {
        if (!item.checked) {
          flag = false;
        } else {
          totalNum++;
        }
      });
      this.totalAmount = totalNum;
      this.isSelectedAll = flag;
    },
    //更新单个商品数量
    updateGoodsCount(goods, count) {
      let user_id = this.userInfo.id;
      this.$store.dispatch("updateGoodsCount", { goods, count, user_id });
      this.getAllGoodsPrice();
    },
    //删除单个商品
    clickTrash(goods) {
      this.$confirm("您确定删除该商品么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let user_id = this.userInfo.id;
          // this.currentDelGoods=goods
          this.$store.dispatch("delSingleGoods", { goods, user_id });
          this.getAllGoodsPrice();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //清空购物车 delAllGoods
    emptyCart() {
      this.$confirm("您确定清空购物车么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let user_id = this.userInfo.id;
          // this.currentDelGoods=goods
          this.$store.dispatch("delAllGoods", { user_id });
          this.getAllGoodsPrice();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
#content > .header {
  width: 100%;
  height: 90px;
  margin: 10px auto;
  position: relative;
  text-align: center;
}

.header > span {
  display: inline-block;
  font-size: 25px;
  height: 35px;
  font-weight: 700;
  position: absolute;

  top: 30%;
  margin-left: 20px;
  cursor: pointer;
}
#content > .cont_title {
  margin: 10px auto;
  width: 80%;
  height: 35px;
  border-bottom: 2px solid #e6e6e6;
}
.cont_title > span {
  display: inline-block;
  font-weight: 700;
  font-size: 17px;
  height: 100%;
  width: 100px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  color: #f40;
  border-bottom: 2px solid #f40;
}
#content > .cont_op {
  width: 80%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-around;
}
.cont_op > div {
  line-height: 40px;
}
.cont_op > div:nth-child(2) {
  width: 120px;
}
#content > .pro_box {
  margin: 0 auto;
  width: 80%;
}
.pro_box > .goods {
  background: #fcfcfc;
  width: 100%;
  height: 130px;
  border: 1px solid #cccccc;
}
.goods > .item_content {
  padding: 15px;
  list-style: none;

  display: flex;
  justify-content: space-around;
}
.item_content > .td-item {
  width: 180px;
  position: relative;
}
.td-item > div {
  display: inline-block;
}
.td-item > .td-item-pic > img {
  width: 80px;
  height: 80px;
}
.td-item > .td-item-info {
  position: absolute;
  width: 80px;
  line-height: 15px;
  font-size: 12px;
  top: 0;
  margin-left: 20px;
}
.item_content > .td-sum {
  color: #f40;
}
.td-amount > .item-amout {
  height: 25px;
}
.item-amout a {
  display: inline-block;
  height: 23px;
  width: 17px;
  border: 1px solid #e5e5e5;
  background: #f0f0f0;
  text-align: center;
  line-height: 23px;
  color: #444;
  cursor: pointer;
}
.item-amout a:hover {
  color: #f50;
  border-color: #f60;
}
.item-amout > .text_amount {
  width: 40px;
  height: 20px;
  text-align: center;
  display: inline-block;
}
.td-op a {
  color: black;
}
.td-op a:hover {
  cursor: pointer;
  color: #f40;
}
#footer {
  width: 80%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 10%;
  background: #e5e5e5;
  z-index: 9999;
}
#footer div {
  display: inline-block;
}
#footer > .foot_select {
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  cursor: pointer;
  font-size: 14px;
}
.foot_select input,
.foot_select label {
  cursor: pointer;
}
.foot_op {
  line-height: 50px;
  height: 50px;
}
.foot_op > .foot_remove {
  margin-left: 25px;
  font-size: 14px;
  cursor: pointer;
}
.foot_remove:hover {
  color: #f40;
}
.foot_total {
  float: right;
}
.foot_total > .amout-sum {
  cursor: pointer;
  height: 50px;
  color: #3c3c3c;
}
.foot_total .txt {
  line-height: 50px;
  font-size: 14px;
}
.amout-sum > #selected_amout {
  padding: 0 5px;
  color: #f40;
  font-weight: 700;
  font-size: 18px;
}
.price-sum {
  margin-left: 50px;
}
.price-sum > .selected_price {
  color: #f40;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
}
.btn-area > .btn-sumbit {
  display: inline-block;
  background: #b0b0b0;
  color: #fff;
  border-left: 1px solid #e7e7e7;
  width: 119px;
  height: 50px;
  cursor: not-allowed;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
.btn-area > .btn-sumbit.btn-allow {
  background: #f22d00;
  cursor: pointer;
}
</style>