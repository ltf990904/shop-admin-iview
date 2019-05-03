<template>
  <Form :model="form" :label-width="80" style="width:900px;">
    <FormItem label="所属类别" style="width:200px;">
      <Select v-model="form.category_id">
        <Option v-for="(v,i) in cateList" :key="i" :value="v.category_id">{{ v.title }}</Option>
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
      <div class="demo-upload-list" v-for="(item,i) in uploadList" :key="i">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="form.imgList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        action="http://localhost:8899/admin/article/uploadimg"
        style="display:inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img :src="imgName.url" v-if="visible" style="width: 100%">
      </Modal>
    </FormItem>
    <FormItem label="商品货号">
      <Input v-model="form.goods_no" placeholder="请输入商品货号"></Input>
    </FormItem>
    <FormItem label="库存数量">
      <Input v-model="form.stock_quantity" placeholder="请输入库存数量"></Input>
    </FormItem>
    <FormItem label="市场价格">
      <Input v-model="form.market_price" placeholder="请输入市场价格"></Input>
    </FormItem>
    <FormItem label="销售价格">
      <Input v-model="form.sell_price" placeholder="请输入销售价格"></Input>
    </FormItem>

    <!-- <FormItem label="图片相册">
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="http://localhost:8899/admin/article/uploadimg"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img
          :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
          v-if="visible"
          style="width: 100%"
        >
      </Modal>
    </FormItem>-->

    <FormItem label="内容摘要">
      <Input v-model="form.zhaiyao" placeholder="请输入内容摘要"></Input>
    </FormItem>
    <FormItem label="内容描述" class="editor">
      <quillEditor v-model="form.content"/>
    </FormItem>

    <FormItem>
      <Button type="success" @click="onSubmit">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
// 引入富文本编辑器的样式文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        fileList: [],
        zhaiyao: "",
        content: "",
        is_slide: false
      },
      cateList: [],

      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    // 提交数据
    onSubmit() {
      this.$axios({
        url: "/admin/goods/add/goods",
        method: "POST",
        data: this.form
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        this.$Message.success(res.data.message);
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      });
    },
    getSelectList() {
      this.$axios({
        url: "/admin/category/getlist/goods"
      }).then(res => {
        console.log(res);
        this.cateList = res.data.message;
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = res.url;
      file.name = res.name;
      this.form.imgList = [res];
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  },
  components: {
    quillEditor
  },
  created() {
    this.getSelectList();
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
