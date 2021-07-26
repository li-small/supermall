<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="allCheckHandle"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:￥{{ totalPrice }}</div>
    <div class="calculate" @click="calculateClick">
      去结算({{ totalCount }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 检测到有没选中的(选中状态为false的)立即返回
      return this.cartList.every((item) => {
        return item.checked;
      });
    },
  },
  methods: {
    allCheckHandle() {
      // 全部被选中时
      if (this.isSelectAll) {
        this.cartList.map((item) => (item.checked = false));
      }
      // 部分或全部不被选中
      else {
        this.cartList.map((item) => (item.checked = true));
      }
    },
    calculateClick() {
      const result = this.cartList.some((item) => {
        return item.checked;
      });
      result
        ? this.$toast.show("客官您慢走，欢迎下次再来")
        : this.$toast.show("请选择要购买的商品");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.check-all {
  display: flex;
  padding-left: 10px;
  flex: 1;
}

.check-button {
  padding-right: 8px;
}

.price {
  flex: 2;
  padding-left: 20px;
}

.calculate {
  flex: 1;
  height: 100%;
  width: 90px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: orangered;
}
</style>