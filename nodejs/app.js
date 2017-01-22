var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')
var targetUrl = 'https://github.com/trending/javascript?since=weekly'

var eventproxy = require('eventproxy')
var ep = new eventproxy()

var async = require('async')

superagent.get(targetUrl)
.end(function (err, res) {
  if(err) {
    return console.error(err)
  }
  console.log('爬虫开始')
  var $ = cheerio.load(res.text)  // 利用cheerio来解析页面

  var repoUrls = []  // 保存仓库的url
  var titleArray = []

  console.log($('.repo-list .mb-1 a').length) // 25
  $('.repo-list .mb-1 a').each(function (index, element) {
    var $element = $(element)

    // 获取每个仓库的url
    var href = url.resolve('https://github.com', $element.attr('href'))
    repoUrls.push(href)

    // 获取每个仓库名
    var $title = $element.contents().last()[0].data
    $title = $title.substr(0, $title.length - 1)
    titleArray.push($title)
  })
  // repoUrls = repoUrls.slice(0, 2)

  // ep.after('accessRepo', repoUrls.length, function(repos) {
  //   var oneRepo = repos.map(function (repo) {
  //     var repoUrl = repo[0]
  //     var repoHTMl = repo[1]
  //     var $ = cheerio.load(repoHTMl)

  //     var httpGitUrl = $('.https-clone-options .js-url-field').attr('value')
  //     console.log(httpGitUrl)
  //     return ({
  //       url: repoUrl,
  //       httpGitUrl: httpGitUrl
  //     })
  //   })
  //   console.log(oneRepo)  // 获得25个仓库的相应http下载路径
  // })

  // repoUrls.forEach(function (repoUrl) {
  //   superagent.get(repoUrl)
  //     .end(function (err, res) {
  //       console.log('fetch ' + repoUrl + ' successful');
  //       ep.emit('accessRepo', [repoUrl, res.text]);
  //     });
  // })
  
  // async
  // 利用async实现并发数为5的请求处理过程
  concurrencyCount = 0  // 当前并发数记录
  // 对每个repo的逻辑处理函数
  var fetchUrl = function (repoUrl, callback) {
    concurrencyCount++
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', repoUrl)
    superagent.get(repoUrl)
      .end(function(err, res){
        var $ = cheerio.load(res.text);             
        // 对页面内容进行解析
        var httpGitUrl = $('.https-clone-options .js-url-field').attr('value')
        console.log(httpGitUrl)
        return ({
          url: repoUrl,
          httpGitUrl: httpGitUrl
        })
        concurrencyCount--;
        callback(null, repoUrl);
      });
  }

  async.mapLimit(repoUrls, 5,
    function (repoUrl, callback) {
      // 对每个URL进行相应处理
      fetchUrl(repoUrl, callback)
    }, function (err, result) {
      console.log('final:')
      console.log(result)
    }
  )
})
