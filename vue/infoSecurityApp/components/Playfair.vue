<template>
  <div id="playfair">
    <public :key-word="keyword"></public>
    <div class="keyword">
      <label>请输入关键词:</label>
      <input type="text" v-model="keyword" v-on:blur="checkWord" placeholder="monarchy">
    </div>
    <div class="showMatrix">
      <label>则加密矩阵为:</label>
      <table class="playfairMatrix">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
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
        keyword: 'monarchy',
        truekeyword: 'monarchy',
        keyMatrix: [[], [], [], [], []]
      }
    },
    mounted() {
      this.keyMatrix = this.createKeyMatrix()
      this.showMatrix()
    },
    // watch: {
    //   keyword: function(val) {
    //     this.keyMatrix = this.createKeyMatrix()
    //     this.showMatrix()
    //   }
    // },
    methods: {
      checkWord() {
        console.log(this.keyword)
        this.keyMatrix = this.createKeyMatrix()
        this.showMatrix()
      },
       //生成密钥矩阵
      createKeyMatrix() {
        const key = this.keyword.replace(/j/ig, 'i')
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
          if (value == 'I' || value == 'J') {
            keyMatrix[i][j] = 'I/J'
          }
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
      //显示矩阵
      showMatrix() {
        var tdArray = document.querySelectorAll('td')
        console.log(tdArray)
        let i = 0, j = 0
        for(var el of tdArray) {
          if(j === 5) {
            i++
            j = 0
          }
          el.innerText = this.keyMatrix[i][j++]
          if (el.innerText === 'I') {
            el.innerText = 'I/J'
          }
        }
        console.log(tdArray)
      }
    }
  }
</script>

<style>
  .keyword {
    margin-top: 30px;
  }
  .keyword input {
    margin-left: 10px;
    width: 180px;
    border-style: none;
    border-bottom: thin white solid;
    background-color: transparent;
    outline: none;
    color: green;
    font-size: 1.1em;
  }
  .playfairMatrix {
    float: right;
    margin-right: 750px;
    margin-top: -30px;
    color: white;
  }
</style>