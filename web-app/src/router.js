import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import HelloWorld from '@/components/HelloWorld'
import Scanner from '@/components/Scanner'
import Video from '@/components/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/scan',
      name: 'scanPage',
      component: Scanner
    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login
    },
    {
      path: '/helloworld',
      name: 'helloworld',
      component: HelloWorld
    },
    {
      path: '/videos',
      name: 'videos',
      component: Video
    }
  ]
})