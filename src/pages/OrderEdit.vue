<template>
  <Form ref="form" :model="form" :label-width="80" style="width:900px;">
    <FormItem label="订单ID">
      <Input v-model="form.order_no" disabled="true"></Input>
    </FormItem>
    <FormItem label="快递单号">
      <Input v-model="form.express_no"></Input>
    </FormItem>
    <FormItem label="快递费用">
      <Input v-model="form.express_fee"></Input>
    </FormItem>
    <FormItem label="收件人">
      <Input v-model="form.accept_name"></Input>
    </FormItem>
    <FormItem label="收货电话">
      <Input v-model="form.telphone"></Input>
    </FormItem>
    <FormItem label="收货手机">
      <Input v-model="form.mobile"></Input>
    </FormItem>
    <FormItem label="收货邮箱">
      <Input v-model="form.email"></Input>
    </FormItem>
    <FormItem label="收货地区">
      <Input v-model="form.area"></Input>
    </FormItem>
    <FormItem label="收货地址">
      <Input v-model="form.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
    </FormItem>
    <FormItem label="收货备注">
      <Input v-model="form.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
    </FormItem>
    <FormItem label="总金额">
      <Input v-model="form.order_amount"></Input>
    </FormItem>
    <FormItem label="订单状态">
      <Select v-model="form.orderstatus">
        <Option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="onSubmit">保存</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      form: {
        id: 0,
        order_no: 0,
        express_no: "",
        express_fee: 0,
        accept_name: "",
        telphone: "",
        mobile: "",
        email: "",
        area: "",
        address: "",
        message: "",
        order_amount: 0,
        orderstatus: 0
      },
      options: [
        {
          value: 1,
          label: "待付款"
        },
        {
          value: 2,
          label: "已付款"
        },
        {
          value: 3,
          label: "已发货"
        },
        {
          value: 4,
          label: "已签收"
        },
        {
          value: 5,
          label: "已取消"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        url: `admin/order/updateorder`,
        method: "POST",
        data: {
          orderinfo: this.form
        },
        withCredentials: true
      }).then(res => {
        const { message } = res.data;
        this.$Message.success("修改数据成功");
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      });
    }
  },

  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    this.$axios({
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      // console.log(res);
      const {
        message: { orderinfo }
      } = res.data;
      let data = {};
      Object.keys(orderinfo).forEach(v => {
        if (this.form.hasOwnProperty(v)) {
          data[v] = orderinfo[v];
        }
      });
      this.form = data;
    });
  }
};
</script>
