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
      <Table border ref="selection" :columns="columns" :data="accountList">
        <template slot-scope="scope" slot="action">
          <Button type="primary" size="large" style="margin-right: 5px">编辑</Button>
          <Button type="error" size="large">删除</Button>
        </template>
      </Table>
      <Page
        :style="{marginTop:'10px'}"
        :total="accountTotal"
        :page-size.sync="pageSize"
        :current.sync="pageIndex"
        :page-size-opts="[5,10,20,30]"
        @on-change="getAccountList"
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
          title: "姓名",
          width: 200,
          key: "user_name"
        },
        {
          title: "手机号码",
          width: 200,
          key: "mobile"
        },
        {
          title: "邮箱",
          width: 200,
          key: "email"
        },
        {
          title: "时间",
          width: 200,
          key: "reg_time"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      accountList: [],
      pageIndex: 1,
      pageSize: 5,
      accountTotal: 0,
      searchValue: ""
    };
  },
  methods: {
    // 搜索
    handleSearch() {
      this.getAccountList();
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 获取会员列表数据
    getAccountList() {
      this.$axios({
        url: `/admin/account/getlist?pageIndex=${this.pageIndex}&pageSize=${
          this.pageSize
        }&searchvalue=${this.searchValue}`
      }).then(res => {
        // console.log(res);
        let result = res.data;
        this.accountList = result.message;
        this.accountTotal = result.totalcount;
        this.pageIndex = result.pageIndex;
        this.pageSize = result.pageSize;
      });
    },
    pageSizeChange(value) {
      this.pageSize = value;
      this.getAccountList();
    }
  },
  mounted() {
    this.getAccountList();
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
