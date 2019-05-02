<template>
  <div>
    <div class="form-control">
      <div>
        <router-link to="category-add" class="add-btn">
          <Button type="success">新增</Button>
        </router-link>
      </div>
    </div>

    <div class="block">
      <Tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <input :value="data.sort_id" class="order-input" @blur="handleSortId(data, $event)">
        </span>
      </Tree>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: [{}],
      data: []
    };
  },

  mounted() {
    // 获取栏目数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      let arr = [];

      function loop(arr, item) {
        arr.forEach(v => {
          if (v.category_id == item.parent_id) {
            if (!v.children) {
              v.children = [];
            }
            v.children.push({
              ...item,
              id: item.category_id,
              label: item.title
            });
            return;
          }
          if (v.children) {
            loop(v.children, item);
          }
        });
      }

      message.forEach(v => {
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
          loop(arr, v);
        }
      });
      this.data = arr;
    });
  },

  methods: {
    handleSortId(val, event) {
      const inputValue = event.target.value;

      this.$axios({
        url: `/admin/category/edit/${val.category_id}`,
        method: "POST",
        data: {
          ...val,
          sort_id: +inputValue
        }
      }).then(res => {
        const { message } = res.data;
        this.$message({
          message,
          type: "success"
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.form-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.add-btn {
  margin-right: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.order-input {
  width: 40px;
  border-radius: 4px;
  border: 1px #eee solid;
  text-align: center;
}

.block {
  padding: 20px;
  background: #fff;
}

.tree-title /deep/ .el-tree-node__content:hover {
  background: none;
}
</style>
