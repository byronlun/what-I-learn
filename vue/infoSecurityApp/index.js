import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
// import Caesar from './components/Caesar.vue'
// import Playfair from './components/Playfair.vue'
// import Hill from './components/Hill.vue'

Vue.use(VueRouter)

const Home = {
  template: '<div>Home</div>'
}

const Caesar = {
  template: '<div>Caesar</div>'
}

const Playfair = {
  template: '<div>Playfair</div>'
}

const Hill = {
  template: '<div>Hill</div>'
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/Caesar', component: Caesar, alias: '/Caesssar'},
    {path: '/Playfair', component: Playfair},
    {path: '/Hill', component: Hill}
  ]
})

new Vue({
  // el: '#app',
  // render: (createElement) => createElement(App)
  
  router,
  template: `
    <div id="app">
      <h1>三种加密算法</h1>
      <ul class="tab">
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/Caesssar">/Caesar</router-link></li>
        <li><router-link to="/Playfair">/Playfair</router-link></li>
        <li><router-link to="/Hill">/Hill</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
