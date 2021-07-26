/**
 * 返回顶部小模块
 */
import BackTop from "components/content/backTop/BackTop";
export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClick() {
      // 点击返回顶部 scrollTo是内部自带的方法 0,0是x和y坐标 500是毫秒
      this.$refs.back.bscroll.scrollTo(0, 0, 500);
    },
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this._getCategoryDetail(this.currentType)
    }
  }
}