<template>
  <div class="detail">
    <h3>订单详情</h3>
    <div>
      <span>订单id:</span>
      {{data.orderinfo.order_no}}
    </div>
    <div>
      <span>会员名称:</span>
      {{data.orderinfo.user_name}}
    </div>
    <div>
      <span>地址:</span>
      {{data.orderinfo.area}}
    </div>
    <div>
      <span>快递:</span>
      {{data.orderinfo.expressTitle}}
    </div>
    <div>
      <span>状态:</span>
      {{data.orderinfo.orderstatus}}
    </div>
    <div>
      <span>购买时间:</span>
      {{data.orderinfo.add_time}}
    </div>

    <h4 style="margin-top:20px;">订单商品列表</h4>
    <Table
      border
      :columns="columns"
      :data="data.goodslist"
      tooltip-effect="dark"
      style="width: 100%"
    ></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "商品名称",
          width: "800",
          key: "goods_title"
        },
        {
          title: "商品类型",
          key: "goods_no"
        },
        {
          title: "商品价格",
          key: "goods_price"
        }
      ],
      id: 0,
      data: {
        orderinfo: {}
      }
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    // console.log(id);
    this.$axios({
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      console.log(res);
      const { message } = res.data;
      this.data = message;
    });
  }
};
</script>

<style scoped lang="less">
.detail h3,
.detail div {
  margin-bottom: 10px;
}
.detail div span {
  font-weight: 600;
}
.detail p {
  line-height: 2;

  span {
    width: 100px;
    display: inline-block;
  }
}

.goods-info {
  display: flex;
  align-items: center;

  .goods-img {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      display: block;
      height: 64px;
    }
  }
}
</style>
