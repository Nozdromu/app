const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();

// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
const { HOST = 'http://localhost:1234', PORT = '3000' } = process.env;

// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置端口
app.set('port', PORT);
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/build');
app.set('view engine', 'html');
// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(proxy('/api',{ target: HOST,changeOrigin: true}));
app.use(express.static('./build'));
app.get('/home/*',function(res,req){
  req.render('index.html');
})
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// 监听端口
app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});