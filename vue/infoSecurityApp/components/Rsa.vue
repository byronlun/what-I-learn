<template>
  <div id="rsa">
    <label>请输入质数p，q用于生成公钥</label>
    <input type="text" placeholder="3">
    <input type="text" placeholder="5"><br>
    <label>输入加密信息(数字)</label>
    <input type="text" placeholder="123">
    <button>加密</button><br>
    <label>密文信息</label>
    <input type="text"><br>
    <label>输入解密信息(数字)</label>
    <input type="text" placeholder="123">
    <button>解密</button><br>
    <label>原文信息</label>
    <input type="text">
  </div>
</template>

<style>
  input {
    width: 80px;
    border-style: none;
    border-bottom: thin white solid;
    background: transparent;
    outline: none;
    color: green;
    font-size: 1.1em;
  }
</style>