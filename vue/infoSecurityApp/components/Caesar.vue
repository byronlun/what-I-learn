<template>
  <div id="caesar">
    <public></public>
    <div class="key">
      <p>请输入密钥(1 &lt;= K &lt;= 25)</p>
    </div>
  </div>
</template>

<script>
  import Public from './Public.vue'

  export default {
    components: {
      Public
    },

  }
</script>

<style>
  .key {
    clear: both;
    margin-top: 40px;
  }
</style>