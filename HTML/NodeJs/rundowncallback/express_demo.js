//express_demo.js 文件
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var fs = require("fs");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(data);
    });
})


app.get('/addUser', function(req, res) {
    // 读取已存在的数据
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(data));
    });
})


app.get('/:id', function(req, res) {
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]
        console.log(user);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(user));
    });
})


app.post("/notify", function(req, res) {

    //console.log("1");
     res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
     //res.end(JSON.stringify(req.body.name));
     //console.log(req);
     //res.end(JSON.stringify(req.url));
     
     res.end("{\"Code\":\"0\"}");
      console.log(req.body);
     //res.end("{\"name\":\"wfg\"}");



})



var server = app.listen(20003, function() {

    var host = "127.0.0.1" //server.address().address
    var port = 20003; //server.adress().port

    console.log("应用实例，访问地址为 http://%s:%s/notify", host, port)
    console.log("请把上面的地址填入 http://vip:9023/CMApi/api/studio/registerstatusnotify接口的body部分")
    console.log("接下来就可以在这个程序里收PT的EVENT状态了")

})


//添加的新用户数据
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}
