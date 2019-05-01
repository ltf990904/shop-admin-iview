<template>
  <div class="login">
    <div class="bgi"></div>
    <Card style="width:350px">
      <p slot="title">shop-admin 后台管理系统</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="账号">
            <Icon type="ios-person-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          <Button type="error" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "admin",
        password: "123456"
      },
      ruleInline: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登录提交
     handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/admin/account/login',
            method: 'POST',
            data: {
              uname: this.formInline.user,
              upwd: this.formInline.password
            }
          }).then(res => {
            if (res.data.status === 0) {
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.message))
              this.$Message.success('登录成功')
              this.$router.push('/admin')
            } else {
              this.$Message.success(res.data.message)
            }
          })
        } else {
          this.$Message.error('Fail')
        }
      })
    },
    // 重置
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  position: relative;
  overflow: hidden;
  .bgi {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../assets/bg.jpg) no-repeat center;
    background-size: cover;
    filter: blur(5px);
    transform: scale(1.02);
  }
  .ivu-card {
    position: absolute;
    top: 60%;
    right: 200px;
    transform: translateY(-70%);
  }
}
</style>
