<template>
  <div id="caesar">
    <public></public>
    <div class="keyNum">
      <label>请输入密钥K（1 &lt;= K &lt;= 25）:</label>
      <input type="text" v-model="keyNum" placeholder="3">
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
        keyNum: 3
      }
    },
    computed: {
      saveKeyNum() {
        console.log(this.keyNum)
        return this.keyNum
      },
      caesarAlgorithm() {
        //caesar算法
      }
    },
    methods: {

    }
  }
</script>

<style>
  .keyNum {
    margin-top: 20px;
  }
  .keyNum input {
    margin-left: 10px;
    width: 30px;
    border-style: none;
    border-bottom: thin white solid;
    background-color: transparent;
    outline: none;
    color: green;
    font-size: 1.1em;
  }
</style>