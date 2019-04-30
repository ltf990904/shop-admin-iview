<template>
  <div class="layout">
    <Layout>
      <!-- 左侧栏 -->
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="logo">
          <img src="../assets/logo.png" alt style="width:65px">
        </div>
        <Menu
          :active-name="$route.meta"
          :open-names="[navList[0]]"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <Submenu v-for="(v,i) in menus" :key="i" :name="v.name">
            <template slot="title">
              <Tooltip v-if="isCollapsed" :content="v.name" placement="right">
                <Icon :type="v.icon"/>
              </Tooltip>
              <Icon v-else :type="v.icon"/>
              <span>{{ v.name }}</span>
            </template>

            <MenuItem
              v-for="(value,index) in v.children"
              :key="index"
              :name="value.name"
              :to="value.src"
              :class="{'subMenu':isCollapsed}"
            >
              <Tooltip v-if="isCollapsed" :content="value.name" placement="right">
                <Icon :type="value.icon"/>
              </Tooltip>
              <Icon v-else :type="value.icon"/>
              <span>{{ value.name }}</span>
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <!-- 头部部分 -->
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Row type="flex" justify="space-between" align="middle">
            <Row type="flex" align="middle">
              <Icon
                @click.native="collapsedSider"
                :class="rotateIcon"
                :style="{margin: '0 20px'}"
                type="md-menu"
                size="24"
                title="展开左侧栏"
              ></Icon>
              <!-- 面包屑导航 -->
              <Breadcrumb>
                <BreadcrumbItem v-for="(v,i) in navList" :key="i">{{ v }}</BreadcrumbItem>
              </Breadcrumb>
            </Row>
            <!-- 用户信息 -->
            <Row type="flex" align="middle">
              <span class="userinfo">
                {{userInfo.uname}}
                /
                {{userInfo.realname}}
              </span>
              <Button @click="handleLogout" style="margin:0 20px;" type="error">
                <Icon type="md-log-out" size="18"/>退出
              </Button>
            </Row>
          </Row>
        </Header>
        <!-- 中间内容-可以滚动 -->
        <Content
          :style="{margin: '20px', background: '#f5f7f9', minHeight: '260px',overflowY: 'scroll'}"
        >
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      menus: [
        {
          icon: "ios-apps-outline",
          name: "商城管理",
          children: [
            {
              name: "商品管理",
              icon: "ios-paper-outline",
              src: "/admin/goods-list"
            },
            {
              name: "栏目管理",
              icon: "ios-menu",
              src: "/admin/category-list"
            }
          ]
        },
        {
          icon: "md-contacts",
          name: "会员管理",
          children: [
            {
              name: "会员列表",
              icon: "md-person",
              src: "/account/account-list"
            }
          ]
        }
      ]
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    // 退出
    handleLogout() {
      this.$axios({
        url: "/admin/account/logout"
      }).then(res => {
        // console.log(res);
        if (res.data.status === 0) {
          sessionStorage.removeItem("userInfo");
          this.$Message.success(res.data.message);
          this.$router.replace("/login");
        } else {
          this.$Message.error("Fail");
        }
      });
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfo"));
    },
    navList() {
      return this.$route.matched.map(v => {
        return v.meta;
      });
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.logo {
  background-color: #3d424a;
  height: 65px;
  text-align: center;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.userinfo {
  font-size: 16px;
  color: #2d8cf0;
}
.menu-icon {
  transition: all 0.3s;
  cursor: pointer;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.layout,
.ivu-layout {
  height: 100%;
  .subMenu {
    padding: 14px 24px !important;
  }
  /deep/.ivu-menu-vertical {
    .ivu-menu-submenu-title-icon {
      right: 0;
    }
  }
  /deep/.ivu-tooltip-popper {
    left: 78px !important;
  }
}
</style>
