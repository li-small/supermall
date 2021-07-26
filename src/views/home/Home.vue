<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabHandle"
      ref="tabControl1"
      v-show="isTab"
    ></tab-control>
    <!-- scroll为了在移动端能滚动流畅 -->
    <scroll
      class="content"
      ref="back"
      :probe-type="3"
      @listenScroll="scrollHandle"
      :pull-up-load="true"
      @pullingUp="pullUpHandle"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoadHandle"
      ></home-swiper>
      <!-- 推荐模块 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 本周流行模块 -->
      <home-fashion></home-fashion>
      <!-- 切换类型栏模块 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabHandle"
        ref="tabControl2"
      ></tab-control>
      <!-- 类型栏内容模块 -->
      <goods-list :goods="goods[currentTab].list" ref="test"></goods-list>
    </scroll>
    <!-- 类型栏内容的返回顶部小模块 -->
    <!-- 需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符 才能进行监听 -->
    <transition name="scroll">
      <back-top @click.native="backClick" v-show="isShow"></back-top>
    </transition>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFashion from "./childComps/HomeFashion";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { backTopMinxin } from "common/mixin";

export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    HomeRecommend,
    HomeFashion,
  },
  // 使用混入
  mixins: [backTopMinxin],
  data() {
    return {
      banners: [],
      recommends: [],
      // goods用来保存 流行、新款、精选对应的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // currentTab用来保存当前的是哪个类型栏 默认是pop
      currentTab: "pop",
      isTab: false,
      tabOffsetTop: 0,
      saveY: 0,
    };
  },
  // 组件被创建出来时发送网络请求
  created() {
    // 1. 请求多个数据 为了created里面逻辑清晰 请求方法放到了methods
    this.getHomeMultidata();

    // 2. 请求切换类型栏数据 一开始得先把三个类型栏的第一页数据先请求过来展示 pop、new、sell是接口类型名
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.back.bscroll.scrollTo(0, this.saveY);
    // 刷新
    this.$refs.back.refresh();
  },
  deactivated() {
    // 动态获取离开前的位置
    this.saveY = this.$refs.back.bscroll.y;
  },
  mounted() {
    // 监听GoodsListItem中图片加载完成 进行刷新计算可滚动区域
    /* this.$bus.$on("homeImageLoad", () => {
      this.$refs.back.refresh();
    }); */

    // 防抖函数 避免耗费性能 上面的优化
    const ref = debounce(this.$refs.back.refresh, 50);
    this.$bus.$on("homeImageLoad", () => {
      ref();
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabHandle(index) {
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
          break;
      }
      // 新旧切换类型栏记录当前选中的index
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    scrollHandle(position) {
      // 1. 可视区y大于1000显示返回顶部按钮 否则隐藏
      this.isShow = -position.y > 1000;

      // 2. 可视区大于到了类型切换栏的offsetTop就吸顶
      this.isTab = -position.y > this.tabOffsetTop;
    },
    pullUpHandle() {
      // 拉到最底部重新调用一次这个方法加载数据
      this.getHomeGoods(this.currentTab);

      // 下拉加载完成一次后 必须调用这个方法才能加载下一次
      this.$refs.back.bscroll.finishPullUp();
    },
    swiperImageLoadHandle() {
      // 获取tabConto2的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.$refs.back.refresh();
    },

    /**
     * 网络请求相关的方法
     */
    // 这个getHomeMultidata()是methods中的
    getHomeMultidata() {
      // 这个getHomeMultidata是home.js中导出的
      getHomeMultidata().then((res) => {
        // res因为是调用函数的参数 函数执行完 参数数据就被释放 所以得去上面的data()保存请求来的数据保证数据不被回收
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 动态将每次请求过来的类型栏的页数加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // push(...变量)是把拿到的变量一个个放进goods[type].list里
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1; // 拿到数据页码加1
      });
    },
  },
};
</script>

加了scoped 里面的样式就有会作用域 只针对当前类 例如这里的content样式Scroll中content不会有
<style scoped>
#home {
  /* vh是浏览视口高度 100vh是100%视口 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

/* .content {
  滚动区域 高度要减去顶部和底部导航栏
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}*/

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 3;
}

/* 淡入淡出 */
.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.3s;
}

.scroll-enter,
.scroll-leave-to {
  opacity: 0;
}

.scroll-enter-to,
.scroll-leave {
  opacity: 1;
}
</style>