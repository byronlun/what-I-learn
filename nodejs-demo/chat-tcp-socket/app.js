var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io  = require('socket.io')(http);
var path = require('path');

app.use(express.static(__dirname + '/public'));

//设置日志级别
io.set('log level', 1);

app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
}); 

//WebSocket连接监听
io.on('connection',function(socket) {
	socket.emit('open');
	
	console.log(socket.handshake);

	//构造客户端对象
	var client = {
		socket: socket,
		name: false,
		room: 'default',
		color: getColor()
	};

	//对message事件的监听
	socket.on('message', function(msg) {
		var obj = {
			time: getTime(),
			color: client.color,
		};

		//判断是否是第一次连接,第一次连接则确定用户名为第一次输入的值
		if(!client.name) {
			client.name = msg;
			obj['author'] = 'System';
			obj['type'] = 'welcome';
			obj['text'] = client.name;
			console.log(client.name + 'login');

			//返回欢迎语
			socket.emit('system', obj);
			//广播新用户已登陆
			socket.broadcast.emit('system', obj);
		} else {
			obj['author'] = client.name;
			obj['type'] = 'message';
			obj['text'] = msg;
			console.log(client.name + ' say:' + msg);

			//广播给其他用户消息
			socket.emit('message', obj);
			socket.broadcast.emit('message', obj);
		}
	});

	 //监听出退事件
    socket.on('disconnect', function () {  
      	var obj = {
	        time:getTime(),
	        color:client.color,
	        author:'System',
	        text:client.name,
	        type:'disconnect'
      	};

      	// 广播用户已退出
      	socket.broadcast.emit('system',obj);
      	console.log(client.name + 'Disconnect');
    });

	// socket.on('disconnect', function() {
	// 	console.log('user disconnected');
	// });

	// socket.on('chat message', function(msg) {
	// 	console.log('message:' + msg);

	// 	io.emit('chat message', msg);
	// });

});


var getTime = function() {
	var date = new Date();
	return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

var getColor = function() {
	var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green', 'orange','blue','blueviolet','brown','burlywood','cadetblue'];
	return colors[Math.round(Math.random() * 10000 % colors.length)];
};


app.set('port', process.env.PORT || 3000);

var server = http.listen(3000, '0.0.0.0', function() {
	console.log('Express listen on port:' + server.address().port);
});
