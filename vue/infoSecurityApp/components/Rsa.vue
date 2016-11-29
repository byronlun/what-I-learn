<template>
  <div id="rsa">
    <div class="forMar">
      <button v-on:click="getRandomPrime" class="btn">产生随机素数</button>  
      <input type="text" readonly="readonly" placeholder="101" v-model="primeKey[0]">
      <input type="text" readonly="readonly" placeholder="103" v-model="primeKey[1]"><br>

      <button v-on:click="getEncryptKey" class="btn">获取常见加密密钥e</button> 
      <input type="text" readonly="readonly" placeholder="3533" v-model="encryptKey">
      <label>则解密密钥d为</label>
      <input type="text" readonly="readonly" v-model="decryptKey"><br>

      <label>公钥为</label>
      <input type="text" readonly="readonly" v-model="publicKey" class="key">
      <label>私钥为</label>
      <input type="text" readonly="readonly" v-model="privateKey" class="key"><br>

      <label>输入加密信息(数字)</label>
      <input type="text" placeholder="9726" v-model="encryptText">
      <button v-on:click="EncryptBtn" class="EnAndDecryptBtn">加密</button>
      <label>密文信息为</label>
      <input type="text" v-model="cipher"><br>

      <label>输入解密信息(数字)</label>
      <input type="text" placeholder="5761" v-model="decryptText">
      <button v-on:click="DecryptBtn" class="EnAndDecryptBtn">解密</button>
      <label>原文信息为</label>
      <input type="text" v-model="originText">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cipher: null,           //密文信息
        originText: null,       //原文信息
        encryptText: null,      //加密信息
        decryptText: null,      //解密信息

        primeArray: [],
        primeKey: [101, 113],
        encryptKey: 3533,       //加密密钥e
        decryptKey: 6597,       //解密密钥e
        publicKey: [3533, 11413],
        privateKey: [6597, 11413]
      }
    },
    created() {
      this.primeArray = this.createPrime()
    },
    watch: {
      primeKey: function() {
        let n = this.primeKey[0] * this.primeKey[1]
        let faiN = (this.primeKey[0]-1)*(this.primeKey[1]-1)
        this.decryptKey = this.getTMnum(this.encryptKey, faiN)
        this.publicKey = [this.encryptKey, n]
        this.privateKey = [this.decryptKey, n]
      },
      encryptKey: function(val) {
        let n = this.primeKey[0] * this.primeKey[1]
        let faiN = (this.primeKey[0]-1)*(this.primeKey[1]-1)
        this.decryptKey = this.getTMnum(this.encryptKey, faiN)
        this.publicKey = [this.encryptKey, n]
        this.privateKey = [this.decryptKey, n]
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
        console.log(this.primeKey)
        return out
      },
      //获取随机加密密钥e
      getEncryptKey() {
        let encryptKeyArray = [3, 17, 65537]
        this.encryptKey = encryptKeyArray[Math.floor(Math.random()*3)]
        console.log(this.encryptKey)
      },
      //求模反元素
      getTMnum(e, sum) {
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
        this.cipher = this.EnAndDecryption(text, this.publicKey)
      },
      DecryptBtn() {
        let text = this.decryptText
        this.originText = this.EnAndDecryption(text, this.privateKey)
      }
    }
  }
</script>

<style>
  .forMar {
    margin: 20px 0 0 20px;
  }
  input {
    width: 100px;
    text-align: center;
    border-style: none;
    border-bottom: thin white solid;
    background: transparent;
    outline: none;
    color: green;
    font-size: 1.1em;

    margin-bottom: 40px;
  }
  .key {
    width: 190px;
  }
  .btn {
    width: 140px;
  }
  .EnAndDecryptBtn {
    width: 80px;
    margin-right: 40px;
  }
</style>