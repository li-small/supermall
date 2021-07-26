<template>
  <div class="cate-detail">
    <goods-list-item
      v-for="(item, index) in categoryDetail"
      :key="index"
      :goodsItem="item"
      class="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.cate-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
}
.item {
  width: 46%;
}
</style>