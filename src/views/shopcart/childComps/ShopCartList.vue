<template>
  <div class="cart-list">
    <scroll class="content" ref="cart">
      <shop-cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></shop-cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import ShopCartListItem from "./ShopCartListItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    ShopCartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 进购物车要刷新一下
    this.$refs.cart.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>