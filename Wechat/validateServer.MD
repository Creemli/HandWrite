## 关于微信公众号开发

# 如何配置服务端地址
* 使用Node Express 启动服务
* 监听get请求
```javascript
app.get('/api', function(req, res) {
	var echostr, nonce, signature, timestamp;
	var query = request.query;

	if (check(timestamp, nonce, signature,'creem')) {
		return res.send(echostr);
	} else {
		return res.end();
	}

})
```

* Done
