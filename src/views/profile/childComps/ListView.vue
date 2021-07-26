<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  margin-top: 10px;
  background-color: #fff;
  font-size: 15px;
  color: #333;
}

#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

.icon svg {
  width: 18px;
  height: 18px;
}

.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}

.item .info {
  margin-left: 5px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>
