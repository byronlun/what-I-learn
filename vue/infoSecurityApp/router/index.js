import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/Home.vue'
import Caesar from '../components/Caesar.vue'
import Playfair from '../components/Playfair.vue'
import Hill from '../components/Hill.vue'

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home, name: 'home'},
    {path: '/caesar', component: Caesar, name: 'caesar'},
    {path: '/playfair', component: Playfair, name: 'playfair'},
    {path: '/hill', component: Hill, name: 'hill'},
    {path: '*', component: Home, name: 'home'}
    // {
    //   path: '/home/:id',
    //   component: Home,
    //   children:[{
    //     path: 'caesar', component: Caesar, name: 'caesar'
    //   }, {
    //     path: 'playfair', component: Playfair, name: 'playfair'
    //   }, {
    //     path: 'hill', component: Hill, name: 'hill'
    //   }]
    // }
  ]
})