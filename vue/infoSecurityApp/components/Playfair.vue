<template>
  <div id="playfair">
    <public :key-word="keyword"></public>
    <div class="keyword">
      <label>请输入关键词:</label>
      <input type="text" v-model="keyword" v-on:blur="checkWord" placeholder="monarchy">
    </div>
  </div>
</template>

<script>
  import Public from './Public.vue'

  export default {
    components: {
      Public
    },
    data() {
      return {
        keyword: 'monarchy'
      }
    },
    methods: {
      checkWord() {
        console.log(this.keyword)
        this.keyword.replace(/j\gi/, 'i')
      }
    }
  }
</script>

<style>
  .keyword {
    margin-top: 30px;
  }
  .keyword input {
    margin-left: 10px;
    width: 180px;
    border-style: none;
    border-bottom: thin white solid;
    background-color: transparent;
    outline: none;
    color: green;
    font-size: 1.1em;
  }
</style>