<template>
  <div>
    <Form ref="formInline" inline>
      <Row type="flex" justify="space-between">
        <div></div>
        <FormItem prop="user">
          <Input size="large" type="text" v-model.trim="searchValue" placeholder="请输入会员名称">
            <Button slot="append" icon="ios-search" @click="handleSearch"></Button>
          </Input>
        </FormItem>
      </Row>
    </Form>
    <!-- 会员数据列表 -->
    <div>
      <Table border ref="selection" :columns="columns" :data="orderList">
        <template slot-scope="scope" slot="action">
          <router-link :to="`order-edit/${scope.row.id}`">
            <Button type="primary">编辑</Button>
          </router-link>
          <router-link :to="`order-detail/${scope.row.id}`">
            <Button type="success">查看</Button>
          </router-link>
        </template>
      </Table>
      <Page
        :style="{marginTop:'10px'}"
        :total="orderTotal"
        :page-size.sync="pageSize"
        :current.sync="pageIndex"
        :page-size-opts="[5,10,20,30]"
        @on-change="getOrderList"
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
          title: "会员名称",
          width: 100,
          key: "user_name"
        },
        {
          title: "订单id",
          width: 200,
          key: "order_no"
        },
        {
          title: "地址",
          width: 300,
          key: "area"
        },
        {
          title: "快递",
          width: 100,
          key: "expressTitle"
        },
        {
          title: "状态",
          width: 150,
          key: "statusName"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      orderList: [],
      pageIndex: 1,
      pageSize: 5,
      orderTotal: 0,
      searchValue: ""
    };
  },
  methods: {
    // 搜索
    handleSearch() {
      this.getOrderList();
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 获取订单列表数据
    getOrderList() {
      this.$axios({
        url: `/admin/order/getorderlist?pageIndex=${this.pageIndex}&pageSize=${
          this.pageSize
        }&searchvalue=${this.searchValue}`
      }).then(res => {
        // console.log(res);
        let result = res.data;
        this.orderList = result.message;
        this.orderTotal = result.totalcount;
        this.pageIndex = result.pageIndex;
        this.pageSize = result.pageSize;
      });
    },
    pageSizeChange(value) {
      this.pageSize = value;
      this.getOrderList();
    }
  },
  mounted() {
    this.getOrderList();
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
button {
  display: inline-block;
  margin-left: 5px;
}
</style>
