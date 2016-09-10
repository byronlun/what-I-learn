var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();
server.on('request', onRequest);
server.listen(3030);

function onRequest (req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname === '/') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Access-Control-Allow-Origin': 'http://127.0.0.1:54615'
		});
		fs.readFile('index.html', 'utf8', (err, data) => {
			if(err) {
				console.log(err);
			}
			res.write(data);
			res.end();
		});
	}
}
