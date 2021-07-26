<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    // 数据获取方式
    showImage() {
      return (
        this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      );
    },
  },
  methods: {
    imageLoad() {
      if (this.$route.path.indexOf("/home") !== -1) {
        // 发射事件总线
        this.$bus.$emit("homeImageLoad");
      } else if (this.$route.path.indexOf("/Detail") !== -1) {
        this.$bus.$emit("detailImageLoad");
      } else if (this.$route.path.indexOf("/category") !== -1) {
        this.$bus.$emit("categoryLoad");
      }
    },
    itemClick() {
      this.$router.push("/Detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  /* 第一个0是背景颜色 第二个0是background-position的属性简写 14px是 background-size的属性简写 */
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>