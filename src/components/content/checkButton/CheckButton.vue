<template>
  <div>
    <span v-if="isChecked" class="select"></span>
    <span v-else class="pass"></span>
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.select {
  display: block;
  border-radius: 50%;
  font-family: "icomoon";
  color: #fff;
  background-color: var(--color-high-text);
  width: 16px;
  height: 16px;
}

.pass {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
</style>