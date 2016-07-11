function Initilize(name, to) {
    var udp = require('dgram');
    var msgmodel = require('./msgmodel');
    var client = udp.createSocket('udp4');
    var from = {
        name: name,
        host: client.address,
        port: client.remotePort,
        content: ''
    };
    var msg = new msgmodel.FMsg(from);
    process.stdin.resume();
    process.stdin.on('data', function(data) {
        msg.setAction('chat');
        msg.setContent(data.toString('utf8'));
        //如果to不为空，则设置单播给to
        //如果不设置发送给谁，默认进群多播发送给所有人
        if(to !== undefined) {
            msg.setTo({
                name:to
            });
        }
        msg.udpSendMsg(client,function(err,bytes){
            if(err){
              //发送失败
            }
        });
    });

    client.on('message',function(data){
        var data = JSON.parse(data.toString());
        if(!data.from){
            console.log(data.content);
        }else{
            if(!data.to){
                console.log("[%s]:%s",data.from.name,data.content);
            }else{
                console.log("[%s@%s]:%s",data.from.name,data.to.name,data.content);
            }
        }
    });

    //默认连接后上线操作
    msg.udpSendMsg(client,function(err,bytes){
        if(err == 0){
            console.log(name + "上线!");
        }
    });
}

exports.Initilize = Initilize;