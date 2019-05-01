<template>
  <div>
    <Form ref="formInline" inline>
      <Row type="flex" justify="space-between">
        <div>
          <FormItem>
            <Button size="large" type="success" @click="$router.push('/admin/goods-add')">新增</Button>
          </FormItem>
          <FormItem>
            <Button size="large" type="error">删除</Button>
          </FormItem>
        </div>
        <FormItem prop="user">
          <Input size="large" type="text" v-model.trim="searchValue" placeholder="请输入内容">
            <Button slot="append" icon="ios-search" @click="handleSearch"></Button>
          </Input>
        </FormItem>
      </Row>
    </Form>

    <div>
      <Table border ref="selection" :columns="columns" :data="goodsList">
        <template slot-scope="{ row }" slot="title">
          <div class="table_title">
            <img :src="row.imgurl" :alt="row.title">
            <span>{{row.title}}</span>
          </div>
        </template>
        <template slot-scope="scope" slot="action">
          <Button type="primary" size="large" style="margin-right: 5px" @click="show(index)">编辑</Button>
          <Button type="error" size="large" @click="handleDelete(scope.row)">删除</Button>
        </template>
      </Table>
      <Page
        :style="{marginTop:'10px'}"
        :total="goodsTotal"
        :page-size.sync="pageSize"
        :current.sync="pageIndex"
        :page-size-opts="[5,10,20,30]"
        @on-change="getGoodsList"
        @on-page-size-change="pageSizeChange"
        show-total
        show-sizer
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          slot: "title"
        },
        {
          title: "类型",
          width: 100,
          key: "categoryname"
        },
        {
          title: "价格",
          width: 100,
          key: "sell_price"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      goodsList: [],
      pageIndex: 1,
      pageSize: 5,
      goodsTotal: 0,
      searchValue: ""
    };
  },
  methods: {
    // 搜索
    handleSearch() {
      this.getGoodsList();
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 获取商品数据列表
    getGoodsList() {
      this.$axios({
        url: `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${
          this.pageSize
        }&searchvalue=${this.searchValue}`
      }).then(res => {
        // console.log(res);
        let result = res.data;
        this.goodsList = result.message;
        this.goodsTotal = result.totalcount;
        this.pageIndex = result.pageIndex;
        this.pageSize = result.pageSize;
      });
    },
    pageSizeChange(value) {
      this.pageSize = value;
      this.getGoodsList();
    },
    // 删除单行数据
    handleDelete(row) {
      const id = row.id;
      // console.log(row.id);
      this.$Modal.confirm({
        title: "系统提示",
        content: "确定要删除商品吗？",
        onOk: () => {
          this.$axios({
            url: `/admin/goods/del/${id}`
          }).then(res => {
            const { status, message } = res.data;
            this.$Message.success(message);
            // 刷新数据商品列表
            this.getGoodsList();
          });
        }
      });
    }
  },
  mounted() {
    this.getGoodsList();
  }
};
</script>

<style lang="less" scoped>
.table_title {
  margin: 10px;
  float: left;
  /deep/ img {
    width: 64px;
    height: 64px;
    margin-right: 10px;
    float: left;
  }
}
</style>
