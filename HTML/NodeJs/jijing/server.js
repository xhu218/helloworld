var jijing = require("./jijingProcess.js");
var my_http = require("./http.js");
require('date-utils');
var fund_stock = require("./fund_stock.js");
var jijingcomment = require("./jijingcomment.js")


/*
串行任务
下载所有基金信息
存放MYSQL
*/

//jijing.download();


/*
串行任务
获取所有基金信息的评论
存入MYSQL
*/

//jijingcomment.test2();


/*

获取所有基金的购买情况
存入本地文件
*/
//fund_stock.getalltheinfo();




//my_http.start();

var scheduletask = true;
//scheduletask = false;

if (scheduletask) {

    var starthour = 12;
    var startmin = 0;

    var schedule = require("node-schedule");
    var rule1 = new schedule.RecurrenceRule();
    rule1.dayOfWeek = [0, new schedule.Range(1, 5)];
    rule1.hour = starthour;
    rule1.minute = startmin;
    var job1 = schedule.scheduleJob(rule1, function() {
        console.log("执行任务");
        jijing.download();

    });


    var rule2 = new schedule.RecurrenceRule();
    rule2.dayOfWeek = [0, new schedule.Range(1, 5)];
    if (rule1.minute + 20 >= 60) {
        rule2.hour = rule1.hour + 1;
        rule2.minute = (rule1.minute + 20) % 60;
    } else {
        rule2.hour = rule1.hour;
        rule2.minute = (rule1.minute + 20);
    }
    var job2 = schedule.scheduleJob(rule2, function() {
        console.log("执行任务");
        jijingcomment.test2();

    });


    var rule3 = new schedule.RecurrenceRule();
    rule3.dayOfWeek = [0, new schedule.Range(1, 5)];
    if (rule2.minute + 20 >= 60) {
        rule3.hour = rule2.hour + 1;
        rule3.minute = (rule2.minute + 20) % 60;
    } else {
        rule3.hour = rule2.hour;
        rule3.minute = (rule2.minute + 20);
    }
    var job3 = schedule.scheduleJob(rule3, function() {
        console.log("执行任务");
        fund_stock.getalltheinfo();

    });

}


/*
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function(input) {
    inputArr.push(input);
    console.log(inputArr[0]);
    console.log(+inputArr[0]);
    inputArr = [];

});

*/