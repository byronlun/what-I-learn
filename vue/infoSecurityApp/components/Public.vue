<template>
  <div id="public">
    <div class="container">
      <div class="centerButton">
        <button>加密</button>
        <button>解密</button>
      </div>
    </div>
    <div class="leftText">
      <h3>原文</h3>
      <textarea name="originText" id="originText" cols="30" rows="10" placeholder="请输入原文"></textarea>
    </div>
    <div class="rightText">
      <h3>密文</h3>
      <textarea name="cipher" id="cipher" cols="30" rows="10" placeholder="请输入密文"></textarea>
    </div>
  </div>
</template>

<style>
  #public {
    overflow: hidden;
  }
  .container {
    float: left;
    width: 100%;
  }
  .centerButton {
    margin-left: 410px;
    margin-right: 420px;
    margin: 65px 410px 0 410px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .centerButton button {
    font-size: 1.2em;
    width: 80px;
    height: 30px;
    background-color: 
  }
  .centerButton button:first-child {
    margin-bottom: 40px;
  }
  .leftText {
    float: left;
    width: 400px;
    margin-left: -100%;
  }
  .rightText {
    float: left;
    margin-left: -406px;
    width: 400px;
  }
  h3 {
    text-align: center;
    color: #fff;
  }
</style>