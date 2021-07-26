<template>
  <div v-show="isShow" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "", // 用于储存弹窗显示信息
      isShow: false, // 用于储存显示或隐藏
      timer: null,
    };
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true;
      this.message = message;
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 10px 17px;
  transform: translate(-50%, -50%);
  z-index: 999;
  text-align: center;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}
</style>