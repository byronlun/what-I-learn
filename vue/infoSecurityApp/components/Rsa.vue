<template>
  <div id="rsa">
    <button v-on:click="getRandomPrime">产生随机数</button>  
    <input type="text" placeholder="101" v-model="primeKey[0]">
    <input type="text" placeholder="103" v-model="primeKey[1]"><br>

    <label>输入加密密钥e(数字)</label>
    <input type="text" placeholder="3533" v-model="encryptKey"><br>

    <label>输入加密信息(数字)</label>
    <input type="text" placeholder="9726" v-model="encryptText">
    <button v-on:click="EncryptBtn">加密</button><br>
    <label>密文信息</label>
    <input type="text" v-model="cipher"><br>

    <label>输入解密信息(数字)</label>
    <input type="text" placeholder="5761" v-model="decryptText">
    <button v-on:click="DecryptBtn">解密</button><br>
    <label>原文信息</label>
    <input type="text" v-model="originText">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cipher: null,
        originText: null,
        primeArray: [],
        primeKey: [101, 103],
        encryptKey: 3533,
        decryptKey: 6597,
        publicKey: [3533, 11413],
        privateKey: [6597, 11413]
      }
    },
    created() {
      this.primeArray = this.createPrime()
    },
    watch: {
      encryptKey: function(val) {
        faiN = (this.primeKey[0]-1)*(this.primeKey[1]-1)
        this.decryptKey = this.getTMnum()
      }
    },
    methods: {
      //产生200以内的素数
      createPrime() {
        var a = []
        for (let i = 2; i < 200; i++) {
          let flag = true
          for (let j = 2; j <= i/2; j++) {
            if (i%j === 0) {
              flag = false
              break;
            }
          }
          if (flag) {
            a.push(i)
          }
        }
        return a;
      },
      //获取两个素数
      getRandomPrime() {
        let primeArray = this.primeArray
        let out = []
        while(out.length < 2){
          let temp = (Math.random()*primeArray.length) >> 0
          out.push(primeArray.splice(temp,1)[0])
        }
        this.primeKey = out
        this.publicKey = []
        return out
      },
      //求模反元素
      getTMnum() {
        let result = 1
        while(!(result%e == 0 && (result-1)%sum == 0)) {
          result += sum
          console.log(result)
        }
        return result/e
      },
      //加密和解密
      EnAndDecryption(text, KeyArray) {
        let result = 1
        let keyOne = KeyArray[0]
        let keyTwo = KeyArray[1]
        for (let i = 0; i < keyOne; i++) {
          result = result*text%keyTwo
        }
        console.log(result)
        return result
      },
      EncryptBtn() {
        let text = this.encryptText
        let cipher = EnAndDecryption(text, this.publicKey)
      },
      DecryptBtn() {
        let text = this.decryptText
        let originText = EnAndDecryption(text, this.privateKey)
      }
    }
  }
</script>

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