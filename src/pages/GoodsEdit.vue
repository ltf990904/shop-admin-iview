<template>
  <div>
    <Form ref="form" :model="form" :label-width="80" style="width:900px;">
      <FormItem label="所属类别" style="width:200px;">
        <Select v-model="form.category_id" placeholder="请选择所属类别">
          <Option
            v-for="(item, index) in categorys"
            :key="index"
            :label="item.title"
            :value="item.category_id"
          ></Option>
        </Select>
      </FormItem>

      <FormItem label="是否发布">
        <i-switch v-model="form.status"></i-switch>
      </FormItem>

      <FormItem label="推荐类型">
        <CheckboxGroup>
          <Checkbox label="置顶" v-model="form.is_top"></Checkbox>
          <Checkbox label="热门" v-model="form.is_hot"></Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="内容标题">
        <Input v-model="form.title" placeholder="请输入内容标题"></Input>
      </FormItem>

      <FormItem label="副标题">
        <Input v-model="form.sub_title" placeholder="请输入副标题"></Input>
      </FormItem>

      <FormItem label="封面图片">
        <!-- action指定上传路径 -->
        <!-- show-file-list 上传多种图片才使用 -->
        <!-- on-success上传成功后的回调函数 -->
        <!-- before-upload 上传之前的事件 -->
        <Upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- img 用于预览图片，imageUrl来自于上传图片成功后 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </Upload>
      </FormItem>

      <FormItem label="商品货号">
        <Input v-model="form.goods_no"></Input>
      </FormItem>

      <FormItem label="商品数量">
        <Input v-model="form.stock_quantity"></Input>
      </FormItem>

      <FormItem label="市场价格">
        <Input v-model="form.market_price"></Input>
      </FormItem>

      <FormItem label="销售价格">
        <Input v-model="form.sell_price"></Input>
      </FormItem>

      <FormItem label="内容摘要">
        <Input type="textarea" v-model="form.zhaiyao"></Input>
      </FormItem>

      <FormItem label="内容描述" class="editor">
        <quillEditor v-model="form.content"></quillEditor>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="onSubmit">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
// 导入外部的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        category_id: "", // 所属类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        fileList: [],
        content: "",
        zhaiyao: "",
        is_slide: false // 在商品详情中不使用
      },
      // 保存类别列表
      categorys: [],
      imageUrl: "",
      // 预览图片的路径
      dialogImageUrl: "",
      // 是否显示预览窗口
      dialogVisible: false
    };
  },
  components: {
    // 编辑器组件
    quillEditor
  },
  mounted() {
    // 请求类别数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      // 保存到categorys
      this.categorys = message;
    });

    // 获取id
    const { id } = this.$route.params;
    // 请求商品数据
    this.$axios({
      url: `/admin/goods/getgoodsmodel/${id}`
    }).then(res => {
      const { message } = res.data;
      //修改封面图片的预览图片
      this.imageUrl = message.imgList[0].url;
      const arr = message.fileList.map(v => {
        return {
          ...v,
          url: "http://localhost:8899" + v.shorturl
        };
      });
      //初始化form的值
      this.form = {
        ...message,
        fileList: arr
      };
    });
  },
  methods: {
    onSubmit() {
      // 提交form数据
      this.$axios({
        url: `/admin/goods/edit/${this.$route.params.id}`,
        method: "POST",
        data: this.form
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.$Message.success(res.data.message);
          this.$router.back();
        }
      });
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      // URL.createObjectURL是html5的新接口，可以用于预览本地图片
      // file.raw路径
      this.imageUrl = window.URL.createObjectURL(file.raw);
      this.form.imgList[0] = res;
    },
    // 上传之前,file就是当前上传的文件对象
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除图片时候触发
    handleRemove(file, fileList) {
      this.form.fileList = fileList;
    },
    // 上传图片成功后的回调
    handlePictureCard(res, file) {
      this.form.fileList.push(res);
    }
  }
};
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.editor .el-form-item__content {
  line-height: unset;
}
</style>
