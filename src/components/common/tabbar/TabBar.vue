<template>
  <div id="tab-bar">
    <!-- 插槽是给tab-bar-item插入 -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
</style>