<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 要把动态绑定的style写到外面去 不然slot到时被替换class也就没了 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  // 接受传过来的path地址
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // 如果活跃路径就返回true
      return this.$route.path == this.path;
    },
    activeStyle() {
      // 如果活跃状态就动态添加color属性 不活跃就不做操作
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* margin: 3px 0 2px 0; */
  vertical-align: middle;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0 2px 0;
  vertical-align: middle;
}
</style>