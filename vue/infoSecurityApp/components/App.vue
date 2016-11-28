<template>
  <div id="app">
    <h1>加密算法演示</h1>
    <ul class="tab">
      <li><router-link to="/caesar">Caesar 算法演示</router-link></li>
      <li><router-link to="/playfair">Playfair 算法演示</router-link></li>
      <li><router-link to="/hill">Hill 算法演示</router-link></li>
      <li><router-link to="/rsa">Rsa 算法演示</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import Home from './Home.vue'
  import Caesar from './Caesar.vue'
  import Playfair from './Playfair.vue'
  import Hill from './Hill.vue'
  import Rsa from './Rsa.vue'

  export default {
    components: {
      Home,
      Caesar,
      Playfair,
      Hill,
      Rsa
    },
    data() {
      return {
        open: false
      }
    },
    methods: {
      changeOpen() {
        this.open = !this.open
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #ccc;
  }
  #app {
    margin: 0px auto;
    width: 1000px;
  }
  h1 {
    text-align: center;
  }
  .tab {
    list-style-type: none;
    text-align: center;
    background-color: #444;
    margin: 0;
    padding: 0;
  }
  .tab li {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2em;
    line-height: 40px;
    height: 40px;
    margin-right: 80px;
    display: inline-block;
  }
  .tab li:last-child {
    margin-right: 0;
  }
  .tab li a {
    text-decoration: none;
    display: block;
    padding: 0 10px;
    color: #fff;
    transition: .3s background-color;
  }
  .tab li a:hover, .tab li a:active {
    background-color: #fff;
    color: #444;
    cursor: default;
  }
  .view {
    background-color: #444;
    width: 980px;
    height: 450px;
    margin-top: 10px;
    padding: 10px;
  }
</style>