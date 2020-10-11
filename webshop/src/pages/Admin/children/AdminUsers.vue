<template>
  <div id="admin-users">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户ID"> </el-table-column>
      <el-table-column prop="user_name" label="账号"> </el-table-column>
      <el-table-column prop="user_phone" label="手机"> </el-table-column>
      <el-table-column prop="user_nickname" label="昵称"> </el-table-column>
      <el-table-column prop="user_address" label="住址"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllUsers } from "../../../api/index";
export default {
  name: "adminusers",
  data() {
    return {
      tableData: [], //用户数据
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      let result = await getAllUsers();
      if (result.success_code === 200) {
        this.tableData = result.message;
      } else {
        this.$message({
          type: "info",
          message: "获取用户失败",
        });
      }
    },
  },
};
</script>
<style scoped>
</style>