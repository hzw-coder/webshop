<template>
  <div id="edit-phone">
    <section class="edit-message">
      <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
      <button
        v-if="!countDown"
        class="get-verification"
        :class="{ phone_right: phoneRight }"
        v-show="phoneRight"
        @click.prevent="getVerifyCode()"
      >
        获取验证码
      </button>
      <button v-else disabled="disabled" class="get-verification">
        已发送({{ countDown }}s)
      </button>
    </section>
    <section class="edit-verification">
      <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
    </section>
    <div class="btn-section">
      <el-button type="primary" @click="goTo('/me/profile')">返回</el-button>
      <el-button type="danger" @click="submitEdit">编辑</el-button>
    </div>
  </div>
</template>
<script>
import { getPhoneCode, changeUserPhone } from "../../../api/index";
import { MessageBox } from "element-ui";
import { mapState } from "vuex";
export default {
  name: "editphone",
  data() {
    return {
      countDown: 0, //倒计时
      phone: "", //手机号
      code: "", //验证码
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    },
  },
  methods: {
    //获取验证码
    async getVerifyCode() {
      //倒计时
      if (this.phoneRight) {
        this.countDown = 60;
        this.intervalId = setInterval(() => {
          this.countDown--;
          // 判断
          if (this.countDown === 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);
      }
      //获取短信验证码
      let result = await getPhoneCode(this.phone);
      //失败
      if (result.err_code === 0) {
        MessageBox({
          type: "info",
          message: result.message,
          showClose: true,
        });
        //清空
        clearInterval(this.intervalId);
        this.countDown = 0;
      } else if (result.success_code === 200) {
        //成功
        MessageBox({
          type: "info",
          message: `验证码为:${result.message}`,
          showClose: true,
        });
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    //编辑
    async submitEdit() {
      //前端校验
      if (!this.phone) {
        this.$message("手机号不得为空！");
        return;
      }
      if (!this.code) {
        this.$message("验证码不得为空！");
        return;
      }
      let result = await changeUserPhone(
        this.userInfo.id,
        this.phone,
        this.code
      );
      if (result.success_code === 200) {
        this.$message({
          message: result.message,
          type: "success",
        });
        this.$store.dispatch("reqUserInfo", { user_id: this.userInfo.id });
        this.$router.push("/me/profile");
      } else {
        this.$message.error(result.message);
      }
    },
  },
};
</script>
<style scoped>
#edit-phone {
  padding-top: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#edit-phone input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
#edit-phone input:focus {
  border: 1px solid #409eff;
}
.edit-message {
  position: relative;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}
.phone_right {
  color: rgb(64, 131, 255);
}
.edit-verification {
  position: relative;
  margin-top: 24px;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.btn-section {
  margin: 50px auto;
  width: 25%;

  display: flex;
  justify-content: space-between;
}
.btn-section .el-button {
  width: 100px;
  outline: none;
}
</style>