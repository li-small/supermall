<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  padding: 15px 0 18px;
  font-size: 12px;
  border-bottom: 9px solid #eee;
}
.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 80%;
  margin-bottom: 5px;
}
</style>