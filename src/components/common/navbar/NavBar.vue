<template>
  <div class="nav-bar">
    <!-- 这里要用div包起来 不然到时候插槽被替换里面定义的class也会没 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>