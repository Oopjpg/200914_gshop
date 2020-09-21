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
Vue.use(VueAwesomeSwiper);
// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button>

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
