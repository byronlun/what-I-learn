<template>
  <div id="box">
    <input type="text">
    <p>test for vue</p>
    <test></test>
  </div>
</template>

<script>
  import Test from './Test.vue'
  module.exports = {
    components : {
      Test
    }
  }
</script>

<style>
  #box {
    color: red;
  }
</style>