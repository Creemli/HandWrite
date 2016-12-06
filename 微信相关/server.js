var express = require('express');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
var app = express();
var crypto = require('crypto');
//app.use('', function(req, res) {
//console.log(req);
//res.send('Test');
//});
var fs = require('fs');
var crypto = require("crypto");
var wechat = function (req, res) {
    var echostr, nonce, signature, timestamp;
    signature = req.query.signature;
    timestamp = req.query.timestamp;
    nonce = req.query.nonce;
    echostr = req.query.echostr;
//console.log(signature, echostr, check(timestamp,nonce,signature,'creem0923'));
  if(check(timestamp,nonce,signature,'creem0923')){
//        return res.send(echostr);
    }else{
  //      return res.end();
    }
};

function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};


var outStream = fs.WriteStream('websites.txt');

//app.use(function(req, res) {
//console.log(req.query,req.params, req.body,'-----');
//});
//app.all('/api', wechat);
//app.get('weixin/text', function(req){console.log('fuck')});

app.use(bodyParser.xml())

app.post('/api', function(req,res) {
    var msg = req.body.xml;
    console.log(msg);
    var finalRes = '闲的蛋疼？';
    var reg = new RegExp("(^|&)url=([^&]*)(&|$)");
    if (msg.Content[0]) {
        var x = msg.Content[0].match(reg);
        if (x && x[2]) {
            finalRes = decodeURIComponent(x[2]);
            outStream.write(finalRes + '\n');
        }
}
var data = {
        fromUserName: msg.ToUserName[0],
toUserName: msg.FromUserName[0],
msgType: 'text',
content: finalRes,
funcFlag: 0
};
res.writeHead(200, {'Content-Type': 'application/xml'});
var a = '<xml>' +
    '<ToUserName><![CDATA[' + data.toUserName + ']]></ToUserName>' +
    '<FromUserName><![CDATA[' + data.fromUserName + ']]></FromUserName>' +
    '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
    '<MsgType><![CDATA[text]]></MsgType>' +
    '<Content><![CDATA['+data.content+']]></Content>' +
    '</xml>';
//res.send(a);
console.log(a)
res.write(a);
res.end();
 //fs.writeFile(fileName, data.content, 'utf-8', (err) => {console.log(err)});
});




app.listen(80);
