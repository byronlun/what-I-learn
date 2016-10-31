<template>
  <p v-on:click="test">test.vue已经加载</p>
</template>
<script>
  module.exports = {
    methods: {
      test: function () {
        console.log('run it.');
      }
    }
  } 
</script>