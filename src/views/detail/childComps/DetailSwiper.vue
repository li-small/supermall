<template>
  <swiper class="detail-swiper">
    <swiper-item
      class="swiper-item"
      v-for="(item, index) in topImages"
      :key="index"
      @load="detailSwiperLoad"
    >
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    SwiperItem,
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    detailSwiperLoad() {
      this.$emit("detailSwiperLoad");
    },
  },
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
}
</style>