<template>
  <div class="wrapper" ref="wrapper" @load="imgLoad">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  components: {
    BScroll,
  },
  props: {
    probeType: {
      type: Number,
      dafault: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bscroll: null,
    };
  },
  methods: {
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    imgLoad() {
      this.$emit("imgLoad");
    },
  },
  mounted() {
    // 1. 创建BScroll对象
    this.bscroll = new BScroll(this.$refs.wrapper, {
      // better-scroll 默认会阻止浏览器的原生 click 事件 默认值是false
      // bettImagescroll 默认会阻止浏览器的原生 click 事件 默认值是false
      click: true,
      // 监听滚动
      probeType: this.probeType,
      // 监听上拉加载
      pullUpLoad: this.pullUpLoad,
    });

    // 2. 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on("scroll", (position) => {
        // 发送监听到的事件 自定义事件名
        this.$emit("listenScroll", position);
      });
    }

    // 3. 监听上拉加载事件(滚动到底部)
    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style>
</style>