<template>
  <div class="cate">
    <div class="item" v-for="(item, index) in subcate" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" @load="handleCateImg" alt="" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subcate: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      timer: 0,
    };
  },
  methods: {
    handleCateImg() {
      this.$bus.$emit("imageHandle");
    },
  },
};
</script>

<style scoped>
.cate {
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
  margin-bottom: 20px;
  width: 100%;
}

.item {
  width: 33%;
  padding: 5px;
  margin-top: 13px;
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 7px;
}
</style>