<template>
  <div>
    <div class="common-info" v-if="Object.keys(commonInfo).length !== 0">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right" />
        </div>
      </div>
      <div class="info-user">
        <img :src="commonInfo.user.avatar" alt="" />
        <span>{{ commonInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ commonInfo.content }}</p>
        <div class="info-other">
          <span class="date">{{ commonInfo.created | showDate }}</span>
          <span>{{ commonInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <img
            :key="index"
            :src="item"
            alt=""
            v-for="(item, index) in commonInfo.images"
          />
        </div>
      </div>
    </div>
    <div class="common-info" style="color: red" v-else>暂无用户评论</div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommonInfo",
  props: {
    commonInfo: {
      type: Object,
    },
  },
  filters: {
    showDate: function (value) {
      // 将时间戳转成Date对象 时间戳是秒单位 Date需要毫秒单位
      let date = new Date(value * 1000);
      // 格式化
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style scoped>
.common-info {
  padding: 5px 12px;
  color: #333333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 15px;
  float: left;
}

.header-more {
  font-size: 13px;
  float: right;
  margin-right: 10px;
}

.info-user {
  padding: 10px 0 5px;
}

.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info-user span {
  font-size: 15px;
  position: relative;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  line-height: 1.5;
  color: #777777;
}

.info-detail .info-other {
  font-size: 12px;
  margin-top: 10px;
  color: #999999;
}

.info-other .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
