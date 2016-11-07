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
        let result = word.replace(/[^a-z]/ig, '').toLocaleUpperCase().split('').map(function(char) {
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
        let result = word.replace(/[^a-z]/ig, '').toLocaleLowerCase().split('').map(function(char) {
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
        const key = this.key
        const keyArray = key.toLocaleUpperCase().split('')
        var i = 0,
            j = 0,
            keyMatrix = [[], [], [], [], []],
            temp = {}
        // 将关键词的每个字母分别赋值到密钥矩阵中
        keyArray.forEach(function(value) {
          if(j === 5) {
            i++
            j = 0
          }
          keyMatrix[i][j] = value
          j++
          temp[value] = true
        })
        temp['J'] = true
        // 接下来将剩下的字母补全密钥矩阵
        for(let k = 65; k < 91; k++) {
          let transformKey = String.fromCodePoint(k)
          if(!temp[transformKey]) {
            if(j === 5) {
              i++
              j = 0
            }
            keyMatrix[i][j] = transformKey
            j++
            temp[transformKey] = true
          }
        }
        console.log(keyMatrix)

        //将输入原文过滤之后装进两两装进数组中，最后如果为单数则补'K'
        var inputText = this.originText.replace(/[^a-z]/ig, '').toLocaleUpperCase().split(''),
            inputArray = []
        i = 0
        inputArray[i] = []
        while(inputText.length) {
          if (inputArray[i].length === 2) {
            i++
            inputArray[i]= []
          }
          let letter = inputText.shift()
          inputArray[i].push(letter)
        }
        if (inputArray[i].length === 1) {
          inputArray[i].push('K')
        }
        console.log(inputArray)

        let resultArray = [], resultText = [];
        //考虑各种情况的加密过程
        var x1, x2, y1, y2
        for (var i = 0; i < inputArray.length; i++) {
          x1 = 0, x2 = 0, y1 = 0, y2 = 0;
          for(let k = 0; k < 5; k++) {
            for(let t = 0; t < 5; t++) {
              if (inputArray[i][0] === keyMatrix[k][t]) {
                x1 = k, y1 = t
              }
              if (inputArray[i][1] === keyMatrix[k][t]) {
                x2 = k, y2 = t
              }
            }
          }
          //判断三种情况
          resultArray[i] = []
          if (x1 === x2) {
            resultArray[i].push(keyMatrix[x1][(y1+1)%5], keyMatrix[x2][(y2+1)%5])
          } else if (y1 === y2) {
            resultArray[i].push(keyMatrix[(x1+1)%5][y1], keyMatrix[(x2+1)%5][y2])
          } else {
            resultArray[i].push(keyMatrix[x1][y2], keyMatrix[x2][y1])
          }
          console.log(resultArray[i])
        }

        //将密文数组转化为密文
        resultArray.forEach(function(array) {
          resultText.push(array[0], array[1])
        })
        this.cipher = resultText.join('')
        console.log(resultText)
      },
      //Playfair解密
      playfairDecryption() {
        //将输入原文过滤之后装进两两装进数组中，最后如果为单数则补'K'
        var inputText = this.originText.replace(/[^a-z]/ig, '').toLocaleUpperCase().split(''),
            inputArray = []
        i = 0
        inputArray[i] = []
        while(inputText.length) {
          if (inputArray[i].length === 2) {
            i++
            inputArray[i]= []
          }
          let letter = inputText.shift()
          inputArray[i].push(letter)
        }
        if (inputArray[i].length === 1) {
          inputArray[i].push('K')
        }
        console.log(inputArray)

        let resultArray = [], resultText = [];
        //考虑各种情况的加密过程
        var x1, x2, y1, y2
        for (var i = 0; i < inputArray.length; i++) {
          x1 = 0, x2 = 0, y1 = 0, y2 = 0;
          for(let k = 0; k < 5; k++) {
            for(let t = 0; t < 5; t++) {
              if (inputArray[i][0] === keyMatrix[k][t]) {
                x1 = k, y1 = t
              }
              if (inputArray[i][1] === keyMatrix[k][t]) {
                x2 = k, y2 = t
              }
            }
          }
          //判断三种情况
          resultArray[i] = []
          if (x1 === x2) {
            resultArray[i].push(keyMatrix[x1][(y1+1)%5], keyMatrix[x2][(y2+1)%5])
          } else if (y1 === y2) {
            resultArray[i].push(keyMatrix[(x1+1)%5][y1], keyMatrix[(x2+1)%5][y2])
          } else {
            resultArray[i].push(keyMatrix[x1][y2], keyMatrix[x2][y1])
          }
          console.log(resultArray[i])
        }

        //将密文数组转化为密文
        resultArray.forEach(function(array) {
          resultText.push(array[0], array[1])
        })
        this.cipher = resultText.join('')
        console.log(resultText)
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