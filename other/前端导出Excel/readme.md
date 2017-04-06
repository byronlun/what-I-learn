# 使用js-xlsx实现兼容性良好的前端处理Excel文件方案

## 简介 `js-xlsx` 

`js-xlsx` 库是目前 [GitHub](https://github.com/SheetJS/js-xlsx) 上 star 最多的前端用来处理各种Excel格式文件的**读取解析**和**写入导出**的库。

引用官方文档中的一张图来看其有多强大：
![](http://ww1.sinaimg.cn/large/005JoIL8gy1fecyotfw93j30n00lq42w.jpg)

不过官方文档写得不怎么友好，简单上手教程可以参考:
- [在 Node.js 中利用 js-xlsx 处理 Excel 文件](http://scarletsky.github.io/2016/01/30/nodejs-process-excel/)
- [读写Excel文件探究实践](https://aotu.io/notes/2016/04/07/node-excel/)

## 使用DEMO

前端导出Excel有两种方式，一种是借助 `NodeJS` 来 install `js-xlsx`，然后导出文件；另一种是直接用 `script` 标签引入 `js-xlsx` 源文件，然后导出。
针对这两种情况写了两个demo，一看即懂，直接上手~哈哈~

- [NodeJS 引入]https://github.com/byronlun/what-I-learn/blob/master/other/%E5%89%8D%E7%AB%AF%E5%AF%BC%E5%87%BAExcel/nodejs%E5%BC%95%E5%85%A5/demo.js)
- [页面引入](https://github.com/byronlun/what-I-learn/blob/master/other/%E5%89%8D%E7%AB%AF%E5%AF%BC%E5%87%BAExcel/script%E5%BC%95%E5%85%A5/demo.html)


