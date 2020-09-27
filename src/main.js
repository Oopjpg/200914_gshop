/* eslint-disable */
/*
入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router/index'
import store from './store/index'
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueLazyload from 'vue-lazyload'

import './mock/mockServer' // 加载 mockServer 即可
import loading from './common/imgs/loading.gif'
import './filters/index' // 加载过滤器

Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, { // 内部自定义了一个指令 v-lazy
  loading
})
// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button>

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
