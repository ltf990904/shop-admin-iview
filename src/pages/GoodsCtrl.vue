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
      <div class="demo-upload-list" v-for="(item,i) in form.imgList" :key="i">
        <template>
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
      </div>
      <Upload
        ref="avatar"
        :show-upload-list="false"
        :default-file-list="form.imgList"
        :on-success="handleAvatarSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action="http://localhost:8899/admin/article/uploadimg"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img :src="modalImg" v-if="visible" style="width: 100%">
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

    <FormItem label="图片相册">
      <div class="demo-upload-list" v-for="(item,i) in form.fileList" :key="i">
        <template>
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleFileRemove(item)"></Icon>
          </div>
        </template>
      </div>
      <Upload
        ref="file"
        :show-upload-list="false"
        :default-file-list="form.fileList"
        :on-success="handleFileSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action="http://localhost:8899/admin/article/uploadimg"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img :src="modalImg" v-if="visible" style="width: 100%">
      </Modal>
    </FormItem>

    <FormItem label="内容摘要">
      <Input v-model="form.zhaiyao" placeholder="请输入内容摘要"></Input>
    </FormItem>
    <FormItem label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </FormItem>

    <FormItem>
      <Button @click="onSubmit" type="primary">保存</Button>
      <Button @click="$router.go(-1)" style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
// 导入富文本编辑器的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 导入组件
import { quillEditor } from "vue-quill-editor";

export default {
  // 注册组件
  components: {
    quillEditor
  },
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
      // 分类列表
      cateList: [],
      visible: false,

      // 相册列表
      fileList: [],
      // modal图片
      modalImg: ""
    };
  },
  methods: {
    // 提交表单
    onSubmit() {
      const url = this.goodsId
        ? `admin/goods/edit/${this.goodsId}`
        : "/admin/goods/add/goods";
      this.$axios({
        url,
        method: "POST",
        data: this.form
      }).then(res => {
        if (res.data.status === 0) {
          this.$Message.success(res.data.message);
          this.$router.push("/admin/goods-list");
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    // 获取商品分类列表
    getSelectList() {
      this.$axios({
        url: "/admin/category/getlist/goods"
      }).then(res => {
        // console.log(res)
        this.cateList = res.data.message;
      });
    },

    // 上传格式错误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: "只能为jpg、jpeg、png格式"
      });
    },
    // 上传超出大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片过大",
        desc: "图片不能超过2M"
      });
    },
    handleView(value) {
      this.modalImg = value.url;
      this.visible = true;
    },
    handleRemove(file) {
      const imgList = this.form.imgList;
      this.form.imgList.splice(imgList.indexOf(file), 1);
    },
    handleAvatarSuccess(res, file) {
      this.form.imgList = [res];
    },
    handleFileSuccess(res, file) {
      this.form.fileList.push(res);
    },
    handleFileRemove(file) {
      const fileList = this.form.fileList;
      this.form.fileList.splice(fileList.indexOf(file), 1);
    },

    // 根据Id获取商品信息
    getGoodsModel(id) {
      this.$axios({
        url: `/admin/goods/getgoodsmodel/${id}`
      }).then(res => {
        // console.log(res);
        if (res.data.status === 0) {
          this.form = res.data.message;
          this.form.category_id = this.form.category_id - 0;
        }
      });
    }
  },
  created() {
    this.getSelectList();
    if (this.goodsId) {
      this.getGoodsModel(this.goodsId);
    }
  },
  computed: {
    goodsId() {
      return this.$route.query.id;
    }
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
