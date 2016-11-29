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
  import math from 'mathjs'

  export default {
    data() {
      return {
        originText: '',
        cipher: '',
        ijTag: [], //数组长度表示用户输入的ij的数量，0表示i，1表示j
        key: this.keyNum ? this.keyNum : this.keyWord
      }
    },
    props: ['keyNum', 'keyWord', 'hillKeyMatrix'],
    // created: function() {
    //   console.log(this.key)
    //   console.log(this.hillKeyMatrix)
    // },
    watch: {
      keyInput: function(val) {
        this.key = val
      },
      keyWord: function(val) {
        this.key = val
      },
      hillKeyMatrix: function(val) {
        this.hillKeyMatrix = val
        console.log(val)
      }
    },
    methods: {
      encryption() {
        //分三种加密算法处理
        if(this.keyNum) {
          this.caesarEncryption()
        } else if(this.keyWord) {
          this.playfairEncryption()
        } else if(this.hillKeyMatrix){
          console.log(this.hillKeyMatrix)
          this.hillEncryption()
        }
        
      },

      decryption() {
        if(this.keyNum) {
          this.caesarDecryption()
        } else if(this.keyWord) {
          this.playfairDecryption()
        } else if(this.hillKeyMatrix){
          this.hillDecryption()
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
      //Playfair生成密钥矩阵
      createKeyMatrix() {
        const key = this.key.replace(/j/ig, 'i')
        console.log(key)
        const keyArray = key.toLocaleUpperCase().split('')
        var i = 0,
            j = 0,
            keyMatrix = [[], [], [], [], []],
            temp = {}
        // 将关键词的每个字母分别赋值到密钥矩阵中
        keyArray.forEach(function(value) {
          if (temp[value]) {
            return ;
          }
          if(j === 5) {
            i++
            j = 0
          }
          keyMatrix[i][j] = value
          // if (value == 'I' || value == 'J') {
          //   keyMatrix[i][j] = 'I/J'
          // }
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
        return keyMatrix
      },
      //Playfair加密
      playfairEncryption() {
        this.ijTag = []
        let keyMatrix = this.createKeyMatrix()
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
          if (letter == 'I' || letter == 'J') {
            if (letter == 'I') {
              this.ijTag.push(0)
            }
            if (letter == 'J') {
              this.ijTag.push(1)
              letter = 'I'
            }
          }
          inputArray[i].push(letter)
        }
        if (inputArray[i].length === 1) {
          inputArray[i].push('K')
        }
        console.log(inputArray)

        let resultArray = [], resultText = [];
        //考虑各种情况的加密过程
        var x1, x2, y1, y2, ijTag
        for (var i = 0; i < inputArray.length; i++) {
          x1 = 0, x2 = 0, y1 = 0, y2 = 0;
          // if (inputArray[i][0] === 'I') {
          //   ijTag = 'I'
          //   inputArray[i][0] = 'I/J'
          // }
          // if (inputArray[i][0] === 'J') {
          //   ijTag = 'J'
          //   inputArray[i][0] = 'I/J'
          // }
          // if (inputArray[i][1] === 'I') {
          //   ijTag = 'I'
          //   inputArray[i][1] = 'I/J'
          // }
          // if (inputArray[i][1] === 'J') {
          //   ijTag = 'J'
          //   inputArray[i][1] = 'I/J'
          // }
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
        let keyMatrix = this.createKeyMatrix()
        //将输入原文过滤之后装进两两装进数组中，最后如果为单数则补'K'
        var inputText = this.cipher.replace(/[^a-z]/ig, '').toLocaleUpperCase().split(''),
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
            y1 = y1 === 0 ? 5 : y1
            y2 = y2 === 0 ? 5 : y2
            resultArray[i].push(keyMatrix[x1][(y1-1)], keyMatrix[x2][(y2-1)])
          } else if (y1 === y2) {
            x1 = x1 === 0 ? 5 : x1
            x2 = x2 === 0 ? 5 : x2
            resultArray[i].push(keyMatrix[(x1-1)][y1], keyMatrix[(x2-1)][y2])
          } else {
            resultArray[i].push(keyMatrix[x1][y2], keyMatrix[x2][y1])
          }
          console.log(resultArray[i])
        }

        //将密文数组转化为密文
        resultArray.forEach(function(array) {
          resultText.push(array[0], array[1])
        })
        //检测到底是i还是j
        if (this.ijTag.length) {
          for (let i = 0; i < resultText.length; i++) {
            if (resultText[i] == 'I') {
              let temp = this.ijTag.shift()
              if (temp == 1) {
                resultText[i] = 'J'
              }
            }
          }
        }
        this.originText = resultText.join('')
        console.log(resultText)
      },
      //hill分割成长度为3的字符串数组
      hillSplit(inputText) {
        var inputArray = []
        while(inputText.length) {
          inputArray.push(inputText.slice(0,3))
          inputText = inputText.slice(3)
        }
        while(inputArray[inputArray.length-1].length<3) {
          inputArray[inputArray.length-1] += 'K'
        }
        console.log(inputArray)
        return inputArray
      },
      //加密长度为3的单位字符串数组
      singleHillEncryption(singleArray, matrix) {
        var resultArray = []
        for(let i = 0; i < 3; i++) {
          let temp = []
          for (let j = 0; j < 3; j++) {
            temp[j] = matrix[i][j] * singleArray[j]
          }
          resultArray[i] = (temp[0] + temp[1] + temp[2])%26
        }
        console.log(resultArray)
        return resultArray
      },
      //矩阵求逆
      inverseMatrix(matrix) {
        // var inverseMatrix
        // for (let i = 0; i < 3; i++) {
        //   for (let j = 0; j < 3; j++) {
            
        //   }
        // }
        return math.inv(matrix)
      },
      //Hill加密
      hillEncryption() {
        var inputText = this.originText.replace(/[^a-z]/ig, '').toLocaleUpperCase(),
            inputArray = this.hillSplit(inputText),
            resultArray = []
        for (let i = 0; i < inputArray.length; i++) {
          let singleArray = inputArray[i].split('')
          for(let j = 0; j < singleArray.length; j++) {
            singleArray[j] = singleArray[j].charCodeAt() - 65
          }
          let resultSingleArray = this.singleHillEncryption(singleArray, this.hillKeyMatrix)
          for(let j = 0; j < resultSingleArray.length; j++) {
            resultSingleArray[j] = String.fromCodePoint(resultSingleArray[j] + 65)
          }
          console.log(resultSingleArray)
          resultArray.push(resultSingleArray.join(''))
        }
        this.cipher = resultArray.join('')
      },
      //Hill解密
      hillDecryption() {
        var inputText = this.cipher.replace(/[^a-z]/ig, '').toLocaleUpperCase(),
            inputArray = this.hillSplit(inputText),
            resultArray = []
        for (let i = 0; i < inputArray.length; i++) {
          let singleArray = inputArray[i].split('')
          for(let j = 0; j < singleArray.length; j++) {
            singleArray[j] = singleArray[j].charCodeAt() - 65
          }
          let invMatrix = math.inv(this.hillKeyMatrix)
          console.log(invMatrix)
          let resultSingleArray = this.singleHillEncryption(singleArray, invMatrix)
          for(let j = 0; j < resultSingleArray.length; j++) {
            resultSingleArray[j] = String.fromCodePoint(Math.round(resultSingleArray[j] + 65))
          }
          console.log(resultSingleArray)
          resultArray.push(resultSingleArray.join(''))
        }
        this.originText = resultArray.join('')
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