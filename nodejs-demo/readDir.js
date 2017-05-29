var fs = require('fs');
var fileList = [];
var dir = {}
// 暂时读取1000，一次性读出太~
var count = 1000

function walk(path, parentDir){
    console.log(path)
    var dirList = fs.readdirSync(path)
    dirList.forEach(function(item){
        if(count > 0) {
            if(fs.statSync(path + '/' + item).isFile()){
                parentDir[item] = item
                fileList.push(path + '/' + item);
                count --
            } else if(fs.statSync(path + '/' + item).isDirectory()) {
                parentDir[item] = {}
                walk(path + '/' + item, parentDir[item])
            }
        }
        
    })
}
walk('/Byronlun', dir)
console.log(fileList)
console.log(dir)
