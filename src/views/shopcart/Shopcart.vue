<template>
  <div class="shop-cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品展示 -->
    <shop-cart-list></shop-cart-list>
    <!-- 底部工具栏 -->
    <shop-cart-bottom></shop-cart-bottom>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ShopCartList from "./childComps/ShopCartList";
import ShopCartBottom from "./childComps/ShopCarBottom.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    ShopCartList,
    ShopCartBottom,
  },
  computed: {
    // 里面是数组不能改名
    // ...mapGetters(["cartLength"]),
    // 里面是对象可以改名
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>