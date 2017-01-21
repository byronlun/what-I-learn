var Crawler = require("crawler")
var url = require('url')
var targetUrl = 'https://github.com/trending/javascript?since=weekly'

var c = new Crawler({
  maxConnections: 5,
  // rateLimit:2000,
  callback : function (error, res, done) {
    if(error){
      console.error(error);
    }else{
      var $ = res.$;
      console.log($('.repo-list').length);
      var repoUrls = [];
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
    done();
  }
});

c.queue(targetUrl);

c.queue(repoUrls)