/* eslint-disable */
/*
入口JS
 */
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
