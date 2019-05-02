<template>
  <div>
    <Form ref="form" :model="form" style="width:300px;">
      <FormItem label="所属父类别" style="margin-top:20px">
        <Select v-model="form.category_id" placeholder="请选择" @on-change="handleChange">
          <Option-group
            v-for="group in category_goods"
            v-if="group.parent_id === 0"
            :key="group.category_id"
            :label="group.title"
          >
            <Option
              v-for="item in category_goods"
              v-if="item.parent_id === group.category_id"
              :key="item.category_id"
              :label="item.title"
              :value="item.category_id"
            ></Option>
          </Option-group>
        </Select>
      </FormItem>

      <FormItem label="排序数字">
        <Input v-model="form.sort_id"></Input>
        <span class="tips">*栏目排序,排序不能小于( {{sortId}} )</span>
      </FormItem>

      <FormItem label="类别名称">
        <Input v-model="form.title"></Input>

        <span class="tips">*类别中文名称，100字符内</span>
      </FormItem>

      <FormItem label="类别级别">
        <Input v-model="form.class_layer"></Input>
        <span class="tips">类别的级别，1:1级菜单 2：二级菜单 依次类推</span>
      </FormItem>

      <FormItem>
        <Button type="success" @click="onSubmit">新增栏目</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category_goods: [],

      form: {
        category_id: "",
        sort_id: "",
        title: "",
        class_layer: ""
      },
      sortId: 0
    };
  },
  mounted() {
    // 获取分类数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      this.category_goods = message;
    });
  },
  methods: {
    handleChange(val) {
      const selected = this.category_goods.filter(v => {
        return v.category_id == val;
      })[0];
      this.sortId = selected.sort_id;
    },
    onSubmit() {
      this.$axios({
        url: `/admin/category/add/goods`,
        method: "POST",
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$Message.success(res.data.message);
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      });
    }
  }
};
</script>

<style scoped lang="less">
.tips {
  font-size: 12px;
  color: #999;
  vertical-align: middle;
  margin: 0 10px;
}
</style>
