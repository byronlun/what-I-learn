var Crawler = require("crawler")
var url = require('url')
var targetUrl = 'https://github.com/trending/javascript?since=weekly'

var repoUrls = []
var titleArray = []
var httpGitUrlArray = []

var c = new Crawler({
  maxConnections: 5,
  callback: function (error, res, done) {
    if(error){
      console.error(error);
    }else{
      var $ = res.$

      // 仓库页面的逻辑处理
      var httpGitUrl = $('.https-clone-options .js-url-field').attr('value')
      console.log(httpGitUrl)

      // 保存到数组中
      httpGitUrlArray.push({
        url: this.uri,
        httpGitUrl: httpGitUrl
      })
    }
    console.log(httpGitUrlArray)
    done();
  }
});

c.queue({
  uri: targetUrl,
  callback: function (error, res, done) {
    if(error){
      console.error(error);
    }else{
      var $ = res.$;
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
    }

    // 直接抓取每个仓库页面
    c.queue(repoUrls)
    done();
  }
})