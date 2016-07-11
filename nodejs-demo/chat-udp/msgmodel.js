var host = '127.0.0.1';//需要连接到服务器提供udp连接的ip
var port = 8124;//需要连接到服务器提供udp连接的端口
var ACTIONS = ['online','chat','request','stranger','del','offline'];
function FMsg(from, to, content) {
    this.from = from;
    this.to = to;
    this.content = content;
    this.action = 'online';
    this.setAction = function (action) {
        this.action = action;
    };
    this.setTo = function (to) {
        this.to = to;
    };

    this.setContent = function (content) {
        this.content = content;
    };
    this.getMsg = function () {
        var msg = {
            from: this.from,
            to: this.to,
            content: this.content,
            action:this.action
        };
        return JSON.stringify(msg);
    };
    this.udpSendMsg = function (client, callback) {
        var data = this.getMsg();
        client.send(data, 0, Buffer.byteLength(data,encoding='utf8'), port, host, callback);
    };
}
exports.FMsg = FMsg;