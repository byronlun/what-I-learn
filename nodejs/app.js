var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var ep = new eventproxy()

var url = require('url')
var targetUrl = 'https://github.com/trending/javascript?since=weekly'
var githubURL = 'https://github.com'

superagent.get(targetUrl)
.end(function (err, res) {
  if(err) {
    return console.error(err)
  }

  var $ = cheerio.load(res.text)
  var liArray = []
  var titleArray = []
  console.log($('.repo-list .mb-1 a').length)
  $('.repo-list .mb-1 a').each(function (index, element) {
    var $element = $(element)
    var href = url.resolve('https://github.com', $element.attr('href'))
    liArray.push(href)
    var $title = $element.contents().last()[0].data
    $title = $title.substr(0, $title.length - 1)
    titleArray.push($title)
  })
  console.log(liArray)
  console.log(titleArray)

  // var topicUrls = [];
  // var $ = cheerio.load(res.text)

  // $('#topic_list .topic_title').each(function (index, element) {
  //   var $element = $(element)

  //   var href = url.resolve(cnodeUrl, $element.attr('href'))
  //   topicUrls.push(href)
  // })

  // console.log(topicUrls)

//   ep.after('accessTopic', topicUrls.length, function(topics) {
//     var oneTopic = topics.map(function (topic) {
//       var topicUrl = topic[0]
//       var topicHTMl = topic[1]
//       var $ = cheerio.load(topicHTMl)
//       return ({
//         title: $('.topic_full_title').text().trim(),
//         url: topicUrl,
//         comment1: $('.reply_content').eq(0).text().trim()
//       })
//     })
//     console.log(oneTopic)
//   })

//   topicUrls.forEach(function (topicUrl) {
//     superagent.get(topicUrl)
//       .end(function (err, res) {
//         console.log('fetch ' + topicUrl + ' successful');
//         ep.emit('accessTopic', [topicUrl, res.text]);
//       });
//   });
})



// async
// var async = require('async')

// var concurrencyCount = 0
// var fetchUrl = function (url, callback) {
//   var delay = parseInt((Math.random() * 10000000) % 2000, 10)
//   concurrencyCount++
//   console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒')
//   setTimeout(function () {
//     concurrencyCount--;
//     callback(null, url + ' html content')
//   }, delay)
// }

// var urls = [];
// for(var i = 0; i < 30; i++) {
//   urls.push('http://datasource_' + i);
// }

// async.mapLimit(urls, 5, function (url, callback) {
//   fetchUrl(url, callback)
// }, function (err, result) {
//   console.log('final:')
//   console.log(result)
// })

// var Crawler = require('crawler')

// var c = new Crawler({
//   maxConnections: 10,
//   callback: function (err, res, done) {
//     if (err) {
//       return console.error(err)
//     }
//     var $ = res.$
//     var topicUrls = []

//     $('#topic_list .topic_title').each(function (index, element) {
//       var $element = $(element)

//       var href = url.resolve(cnodeUrl, $element.attr('href'))
//       topicUrls.push(href)
//     })
//     console.log(topicUrls)
//   }
// })

// c.queue(cnodeUrl)

// var Crawler = require("crawler");

// var c = new Crawler({
//     maxConnections: 2,
//     rateLimit:2000,
//     callback : function (error, res, done) {
//         if(error){
//             console.error(error);
//         }else{
//             var $ = res.$;
//             console.log($('.repo-list').length);
//             var liArray = [];
//             console.log($('.repo-list .mb-1 a').length)
//             $('.repo-list .mb-1 a').each(function (index, element) {
//               var $element = $(element)
//               var href = url.resolve('https://github.com', $element.attr('href'))
//               console.log(href)
//               var $title = $(element).contents().filter(function() {
//                 return this.nodeType === 3; //Node.TEXT_NODE
//               }); 
//               // console.log($title)
//             })
//             console.log($('#pa-freeCodeCamp .col-9 a').attr('href'))
//         }
//         done();
//     }
// });

// c.queue({
//     uri:"https://github.com/trending/javascript?since=weekly"
// });

// c.queue({
//     uri:"http://www.baidu.com"
// });

// c.queue({
//     uri:"http://www.baidu.com"
// });