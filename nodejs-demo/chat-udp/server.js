// 引入dgram模块
var udp = require('dgram');
//创建一个用户实现UDP通信的socket端口对象
//udp4表示针对IPv4
var server = udp.createSocket('udp4');

//用于存储人员之间的离线消息任务
var msgTask = {
    //config: {},
    tasks: []
};

//存储当前在线的用户
var userPool = {
    online: [],
    pool: []
};

//加入某个用户的在线状态
var pushIntoPool = function (name, rinfo) {
    var index = userPool.online.indexOf(name);
    if (index >= 0) {
        userPool.online.splice(index, 1);
        userPool.pool.splice(index, 1);
    }
    userPool.online.push(name);
    userPool.pool.push({name: name, ip: rinfo.address, port: rinfo.port});
};

//移除在线状态
var pullFromPool = function (name) {
    var index = userPool.online.indexOf(name);
    if (index >= 0) {
        userPool.online.splice(index, 1);
        userPool.pool.splice(index, 1);
        return;
    }
};

//加入离线消息任务
var addInTask = function (msg) {
    msgTask.tasks.push({msg: msg, expireTime: 7 * 24 * 3600 + new Date().getTime()});
};

//发送消息
var sendMsg = function (m, rinfo) {
    process.nextTick(function () {
        if (m.to){
            //获取对方的服务地址\端口
            var index = userPool.online.indexOf(m.to.name);
            if (index >= 0) {
                //在线
                var config = userPool.pool[index];
                var msg = JSON.stringify(m);
                server.send(msg, 0, Buffer.byteLength(msg, encoding = 'utf8'), config.port, config.ip, function (err, bytes) {
                    if (err) {
                        //发送失败
                        //缓存数据
                        addInTask(m);
                    }
                });
            } else {
                if (rinfo) {
                    //离线
                    console.log('离线');
                    var content = JSON.stringify({content: m.to.name + '不在线'});
                    server.send(content, 0, Buffer.byteLength(content, encoding = 'utf8'), rinfo.port, rinfo.address, function (err, bytes) {
                        if (err) {
                            //发送失败
                        }
                    });
                }
                //不在线
                pullFromPool(m.to.name);
                //缓存数据
                addInTask(m);
            }

        } else {
            //群聊
            for (var i = 0; i < userPool.pool.length; i++) {
                var to_cfg = userPool.pool[i];
                if (to_cfg.name == m.from.name) {
                    continue;
                } else {
                    var msg = JSON.stringify(m);
                    server.send(msg, 0, Buffer.byteLength(msg, encoding = 'utf8'), to_cfg.port, to_cfg.ip, function (err, bytes) {
                        if (err) {
                            //发送失败
                        }
                    });
                }
            }
        }
    });
};

//后台轮询任务
var backgroundTask = function () {
    for (var i = 0; i < msgTask.tasks.length; i++) {
        var m = msgTask.tasks.splice(i, 1)[0];
        sendMsg(m.msg);
    }
    beginTask();
};

var tid;

var beginTask = function () {
    clearTimeout(tid);
    tid = setTimeout(backgroundTask, 1000);
};


server.on('message', function (msg, rinfo) {
    //注意msg为Buffer对象
    var m = JSON.parse(msg.toString());
    pushIntoPool(m.from.name, rinfo);
    if (m.action == 'online') {
        console.log('当前聊天室在线人数%d::%s', userPool.online.length,userPool.online.join(","));
        return;
    }
    //发送消息
    sendMsg(m, rinfo);
}).bind(8124, function () {
    console.log('服务端启动成功');
    //当服务启动后,开启后台消息轮询服务
    beginTask();
});