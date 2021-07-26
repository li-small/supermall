<template>
  <div id="category">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!-- 商品内容 -->
    <div class="content">
      <!-- 左侧菜单栏 -->
      <tab-menu
        class="left_menu"
        :categories="categories"
        @selectItem="selectItem"
      ></tab-menu>
      <!-- 右侧商品展示 -->
      <div class="right_goods">
        <scroll id="tab-content" ref="back">
          <tab-content-category :subcate="subcate"></tab-content-category>
          <tab-control :titles="tabTitle" @tabClick="tabClick"></tab-control>
          <tab-content-detail
            :category-detail="catedetail"
          ></tab-content-detail>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

import { tabControlMixin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  components: {
    NavBar,
    Scroll,
    TabControl,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [], // 存储分类请求的数据
      categoryData: {}, // 每个标题对应的商品展示
      currentIndex: -1, // 用来记录当前标题索引
      subcate: [], // 右侧商品中间导航栏上面展示数据
      catedetail: [], // 右侧商品中间导航栏下面展示数据
      tabTitle: ["综合", "新品", "销量"],
    };
  },
  created() {
    // 1. 请求分类数据
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        // 1. 获取分类数据
        this.categories = res.data.category.list;
        // 2. 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3. 请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      // 获取请求需要的参数 maitKey
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        // console.log(res);
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");

        // 右侧商品中间导航栏上面展示数据
        this.subcate = this.categoryData[this.currentIndex].subcategories.list;
      });
    },
    _getCategoryDetail(type) {
      // 获取请求需要的参数 miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(res);
        // 将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };

        // 右侧商品中间导航栏下面展示数据
        this.catedetail =
          this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
      this.$refs.back.bscroll.scrollTo(0, 0, 500);
    },
  },
  mounted() {
    // 防抖
    const ref = debounce(this.$refs.back.refresh, 50);
    this.$bus.$on("imageHandle", () => {
      ref();
    });
    this.$bus.$on("categoryLoad", () => {
      ref();
    });
  },
};
</script>

<style scoped>
#category {
  height: calc(100vh - 44px - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  display: flex;
  height: 100%;
}

.left_menu {
  flex: 2;
}

#tab-content {
  height: 100%;
  overflow: hidden;
}

.right_goods {
  flex: 5;
}
</style>