var http = require('http');
var url = require('url');

var server = http.createServer();
server.on('request', onRequest);
server.listen(3030);

var data = {name: 'byronlun', purpose: 'test for jsonp'};

function onRequest (req, res) {
	var params = url.parse(req.url, true);
	if(params.query && params.query.callback) {
		var str  = params.query.callback + '(' + JSON.stringify(data) + ')'; //jsonp
		res.end(str);
	}
}
