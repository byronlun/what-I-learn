<template>
  <div id="public">
    <div class="container">
      <div class="centerButton">
        <button v-on:click="encryption">加密</button>
        <button v-on:click="decryption">解密</button>
      </div>
    </div>
    <div class="leftText">
      <h3>原文</h3>
      <textarea v-model="originText" id="originText" cols="30" rows="10" placeholder="请输入原文"></textarea>
    </div>
    <div class="rightText">
      <h3>密文</h3>
      <textarea v-model="cipher" id="cipher" cols="30" rows="10" placeholder="请输入密文"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        originText: '',
        cipher: '',
        key: this.keyInput
      }
    },
    props: ['keyInput'],
    created: function() {
      console.log(this.key)
    },
    watch: {
      keyInput: function(val) {
        this.key = val
        console.log(val)
      }
    },
    methods: {
      encryption() {
        //分三种加密算法处理
        if(/^\d{1,2}$/.test(this.key)) {
          console.log(this.key)
          this.caesarEncryption()
        } else {
          this.playfairEncryption()
        }
        
      },

      decryption() {
        if(/^\d{1,2}$/.test(this.key)) {
          this.caesarDecryption()
        } else {
          this.playfairDecryption()
        }
      },
      //Caesar加密
      caesarEncryption() {
        let key = this.key
        let word = this.originText
        let result = word.toLocaleUpperCase().split('').map(function(char) {
          var temp = char.charCodeAt() + parseInt(key)
          if (temp > 90) {
            temp = temp - 26
          }
          return String.fromCodePoint(temp)
        })
        this.cipher = result.join('')
      },
      //Caesar解密
      caesarDecryption() {
        let key = this.key
        let word = this.cipher
        let result = word.toLocaleLowerCase().split('').map(function(char) {
          var temp = char.charCodeAt() - parseInt(key)
          if (temp < 97) {
            temp = temp + 26
          }
          return String.fromCodePoint(temp)
        })
        this.originText = result.join('')
      },
      //Playfair加密
      playfairEncryption() {
        // const key = this.key
      },
      //Playfair解密
      playfairDecryption() {

      }
    }
  }
</script>



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
  .leftText textarea, .rightText textarea {
    width: 400px;
    font-size: 1.2em;
  }
  h3 {
    text-align: center;
    color: #fff;
  }
</style>