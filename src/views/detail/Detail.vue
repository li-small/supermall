<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClickHandle"
      ref="navBar"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="back"
      @listenScroll="scrollHandle"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <detail-swiper
        :top-images="topImages"
        @detailSwiperLoad="swiperLoadHandle"
      ></detail-swiper>
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺基本信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详细信息 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoadHandle"
      ></detail-goods-info>
      <!-- 商品参数信息 -->
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <!-- 商品评论信息 -->
      <detail-common-info
        :common-info="commonInfo"
        ref="common"
      ></detail-common-info>
      <!-- 商品推荐信息 -->
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addToCart="addToCartHandle"></detail-bottom-bar>
    <!-- 返回顶部小模块 -->
    <transition name="scroll">
      <back-top @click.native="backClick" v-show="isShow"></back-top>
    </transition>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommonInfo from "./childComps/DetailCommonInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { backTopMinxin } from "common/mixin";
import { mapActions } from "vuex";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommonInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },

  // 使用混入
  mixins: [backTopMinxin],
  data() {
    return {
      iid: null, // 用于储存goods里面的iid
      topImages: [], // 用于储存轮播图
      goods: {}, // 用于储存商品基本信息
      shop: {}, // 用于储存店铺信息
      detailInfo: {}, // 用于储存商品详细信息
      paramInfo: {}, // 用于储存商品参数信息
      commonInfo: {}, // 用于储存商品评论信息
      recommends: [], // 用于储存商品推荐信息
      navTopYs: [], // 用于储存各个导航标题对应的距离顶部的top值
      currentCount: 0, // 用于监听滑动时避免浪费性能
    };
  },
  created() {
    // 一、保存传入的id
    this.iid = this.$route.params.iid;

    // 二、请求详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 1. 获取顶部的图片轮播数据
      this.topImages.push(...data.itemInfo.topImages);

      // 2. 获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5. 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 获取商品评论信息
      if (data.rate.cRate !== 0) {
        this.commonInfo = data.rate.list[0];
      }

      /* // $nextTick()是用来知道什么时候dom更新完成 要等获取完数据并且DOM渲染完 那就用$nextTick()
      this.$nextTick(() => {
        // 根据最新的数据 对应的DOM是已经被渲染出来
        // 但是此时图片依然是没有加载完
      }); */
    });
    // 三、 请求详情页推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoadHandle() {
      this.$refs.back.refresh();

      // 图片加载完获取准确的offsetTop
      this.navTopYs = [];
      this.navTopYs.push(0);
      this.navTopYs.push(this.$refs.params.$el.offsetTop);
      this.navTopYs.push(this.$refs.common.$el.offsetTop);
      this.navTopYs.push(this.$refs.recommends.$el.offsetTop);
    },
    swiperLoadHandle() {
      this.$refs.back.refresh();
    },
    titleClickHandle(index) {
      // 点击导航栏 滚动到对应的模块
      this.$refs.back.bscroll.scrollTo(0, -this.navTopYs[index], 1000);
    },
    scrollHandle(position) {
      // 1. 滚动到对应模块时 导航栏改变
      const positonY = -position.y;
      let length = this.navTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentCount !== i &&
          ((i < length - 1 &&
            positonY >= this.navTopYs[i] &&
            positonY < this.navTopYs[i + 1]) ||
            (i === length - 1 && positonY >= this.navTopYs[i]))
        ) {
          // this.currentCount !== i 避免每次滑动赋值操作过于频繁 耗费性能
          this.currentCount = i;
          this.$refs.navBar.currentIndex = i;
        }
      }

      // 2. 可视区y大于1000显示返回顶部按钮 否则隐藏
      this.isShow = -position.y > 1000;
    },
    addToCartHandle() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车里面
      /* this.$store.dispatch("addCart", product).then((res) => {
      }); */
      // 使用了mapGetter映射 上面的另一种做法
      this.addCart(product).then((res) => {
        // 使用封装好的自定义插件 出现弹窗
        this.$toast.show(res, 1500);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  /* 隐藏底部导航栏 */
  position: relative;
  z-index: 8;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

.detail-nav {
  position: relative;
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