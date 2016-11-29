<template>
  <div id="hill">
    <public v-bind:hill-key-matrix="hillKeyMatrix"></public>
    <div class="keyMatrix">
      <!-- <label>点击按钮产生随机密钥矩阵</label> -->
      <!-- <button v-on:click="createKeyMatrix">生成密钥</button><br> -->
      <label>加密矩阵为:</label>
      <label class="inverseLabel">解密矩阵为:</label>
      <table class="hillKeyMatrix">
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      
      <table class="hillInverseMatrix">
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
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
  import math from 'mathjs'

  export default {
    components: {
      Public
    },
    data(){
      return {
        hillKeyMatrix: [[17,17,5],[21,18,21],[2,2,19]],
        hillInverseMatrix: [[4,9,15],[15,17,6],[24,0,17]]
      }
    },
    mounted() {
      //显示矩阵
      this.showMatrix()
    },
    methods: {
      showMatrix() {
        var tdArray = document.querySelectorAll('.hillKeyMatrix td')
        let i = 0, j = 0
        for(var el of tdArray) {
          if(j === 3) {
            i++
            j = 0
          }
          el.innerText = this.hillKeyMatrix[i][j++]
        }
        console.log(tdArray)

        tdArray = document.querySelectorAll('.hillInverseMatrix td')
        i = 0, j = 0
        for(var el of tdArray) {
          if(j === 3) {
            i++
            j = 0
          }
          el.innerText = this.hillInverseMatrix[i][j++]
        }
      },
      createKeyMatrix() {
        let hillKeyMatrix = [];
        for(let i = 0; i < 3; i++) {
          hillKeyMatrix[i] = []
          for(let j = 0; j < 3; j++) {
            hillKeyMatrix[i][j] = Math.round(Math.random()*24)+1
          }
        }
        if(this.checkMatrix(hillKeyMatrix)) {
          this.hillKeyMatrix = hillKeyMatrix
          this.showMatrix()
        } else {
          this.createKeyMatrix()
        }
      },
      checkMatrix(hillKeyMatrix) {
        return math.det(hillKeyMatrix)
      }
    }
  }
</script>

<style>
  .keyMatrix {
    margin-top: 30px;
  }
  table {
    color: white;
    margin-top: 10px;
  }
  .hillKeyMatrix {
    margin-left: 10px;
  }
  .hillInverseMatrix {
    float: right;
    margin-right: 780px;
    margin-top: -68px;
  }
  .inverseLabel {
    margin-left: 50px;
  }
  td {
    text-align: center;
  }
</style>