<template>
  <div id="caesar">
    <public :key-num="keyNum"></public>
    <div class="keyNum">
      <label>请输入密钥K（1 &lt;= K &lt;= 25）:</label>
      <input type="text" v-model="keyNum" v-on:input="checkNum" placeholder="3">
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
    methods: {
      checkNum() {
        if(this.keyNum <= 1 || this.keyNum >= 25) {
          this.keyNum = 3
          alert('密钥输入格式不正确')
        }
      }
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