<template>
  <div id="addgoods">
    <h3>商品上架</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品ID" prop="goods_id" style="width: 250px">
        <el-input v-model="ruleForm.goods_id" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="short_name" style="width: 500px">
        <el-input v-model="ruleForm.short_name"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" style="width: 500px">
        <el-upload
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-change="handleChange"
          :auto-upload="false"
          :multiple="false"
          limit:1
          action="http://localhost:3000"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品特价" prop="price" style="width: 250px">
        <el-input v-model="ruleForm.price" min="0" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="counts" style="width: 250px">
        <el-input v-model="ruleForm.counts" min="0" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签" prop="sales_tip" style="width: 500px">
        <el-input v-model="ruleForm.sales_tip"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="goods_name" style="width: 500px">
        <el-input
          type="textarea"
          v-model="ruleForm.goods_name"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addGoodsToRecom } from "../../../api/index";
export default {
  name: "addgoods",
  data() {
    return {
      fileList: [], //存放图片
      dialogVisible: false,
      dialogImageUrl: "",
      ruleForm: {
        goods_id: null, //id
        short_name: "", //名称
        price: null, //特价
        counts: null, //库存
        category: "", //分类
        sales_tip: "", //标签
        goods_name: "", //详情
      },
      //校验规则
      rules: {
        goods_id: [
          { required: true, message: "请输入商品ID", trigger: "blur" },
        ],
        short_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品特价", trigger: "blur" }],
        counts: [
          { required: true, message: "请输入商品库存", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        sales_tip: [
          { required: true, message: "请输入商品标签", trigger: "blur" },
        ],
        goods_name: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
        ],
      },
      options: [
        {
          value: 1,
          label: "图书、音像",
        },
        {
          value: 2,
          label: "家居生活",
        },
        {
          value: 3,
          label: "服饰、箱包",
        },
        {
          value: 4,
          label: "电子产品",
        },
        {
          value: 5,
          label: "美食宝典",
        },
      ],
    };
  },
  methods: {
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file;
      this.dialogVisible = true;
    },
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        //只选最后一次的选择
        fileList = fileList.slice(-1);
      }
      this.fileList = fileList;
    },
    //创建
    async submitForm() {
      let flag = false;
      this.$refs.ruleFormRef.validate((vali) => {
        if (vali) {
          this.$refs.ruleFormRef.model.goods_id = Number(
            this.$refs.ruleFormRef.model.goods_id
          );
          this.$refs.ruleFormRef.model.counts = Number(
            this.$refs.ruleFormRef.model.counts
          );
          this.$refs.ruleFormRef.model.price = Number(
            this.$refs.ruleFormRef.model.price
          );
          flag = true;
        }
      });
      //   if (!this.fileList.length) {
      //     flag = false;
      //   }
      if (flag) {
        let formData = new FormData();
        formData.append("goods_id", this.$refs.ruleFormRef.model.goods_id);
        formData.append("short_name", this.$refs.ruleFormRef.model.short_name);
        formData.append("goods_name", this.$refs.ruleFormRef.model.goods_name);
        formData.append("counts", this.$refs.ruleFormRef.model.counts);
        formData.append("price", this.$refs.ruleFormRef.model.price);
        formData.append("sales_tip", this.$refs.ruleFormRef.model.sales_tip);
        formData.append("category", this.$refs.ruleFormRef.model.category);
        formData.append("goods_img", this.fileList[0].raw);
        //发送请求
        let result = await addGoodsToRecom(formData);
        if (result.success_code === 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.$router.replace("/admin");
        } else if (result.success_code === 500) {
          this.$message({
            type: "info",
            message: "商品已存在",
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败",
          });
        }
      }
    },
    //重置
    resetForm() {
      //   console.log("zzzzzzzzzz");
      this.$refs.ruleFormRef.resetFields();
    },
  },
};
</script>
<style scoped>
#addgoods {
  padding-top: 20px;
}
#addgoods > h3 {
  font-weight: bolder;
  margin: 10px 10px 30px 10px;
}
</style>