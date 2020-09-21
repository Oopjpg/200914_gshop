<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="search" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="login" :to=" userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <i class="iconfont icon-person" v-else></i>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-swiper:mySwiper="swiperOption" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="'_' + index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import 'swiper/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    data () {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com',
        swiperOption: {
          init: false,
          loop: true, // 设置为true 则开启loop模式。loop模式：会在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    mounted () {
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    watch: {
      categorys (newVal) {
        // 界面更新就立即创建 swiper 对象
        this.$nextTick(() => { // 一旦完成界面更新就立即调用(此条语句要写在数据更新之后)
          this.mySwiper.init()
        })
      }
    },
    computed: {
      ...mapState(['address', 'categorys', 'userInfo']),
      /*
        根据 categorys 一维数组生成一个2维数组
        小数组中的元素个数最大是8
       */
      categorysArr () {
        const {categorys} = this
        // 准备一个空的二维数组
        const arrResult = []
        // 准备一个小数组(最大长度为8)
        let arr = []
        // 遍历 categorys
        categorys.forEach(c => {
          // 如果当前小数组已经满了就创建一个新的
          if (arr.length === 8) {
            arr = []
          }
          // 如果小数组是空的，就保存到大数组去
          if (arr.length === 0) {
            arrResult.push(arr)
          }
          arr.push(c)
        })
        return arrResult
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
