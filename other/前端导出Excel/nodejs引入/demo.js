var XLSX = require('xlsx')
var _headers = ['员工编号', '姓名', '状态', '专业', '项目', '行政负责人']
var _data = [ { 员工编号: 'G3211',
                姓名: '小明',
                状态: '',
                专业: 'UI',
                项目: 'G62',
                行政负责人: '大疆' },
              { 员工编号: 'G3212',
                姓名: '张翔',
                状态: '',
                专业: 'QA',
                项目: 'G50',
                行政负责人: '大疆' }];

var headers = _headers
                .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

var data = _data
              .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
              .reduce((prev, next) => prev.concat(next))
              .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

// 合并 headers 和 data
var output = Object.assign({}, headers, data);
// 获取所有单元格的位置
var outputPos = Object.keys(output);
// 计算出范围
var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

// workbook规则
// {
//     SheetNames: ['mySheet'],
//     Sheets: {
//         'mySheet': {
//             '!ref': 'A1:E4', // 必须要有这个范围才能输出，否则导出的 excel 会是一个空表
//             A1: { v: 'id' },
//             ...
//         }
//     }
// }

// 构建 workbook 对象
var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
        'mySheet': Object.assign({}, output, { '!ref': ref })
    }
};

// 导出 Excel
XLSX.writeFile(wb, 'output.xlsx');
