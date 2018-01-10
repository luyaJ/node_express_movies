var express = require('express');
// 告诉express，有需要样式的去bower-component中找
var path = require('path');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://101.132.128.72:27017/movie';

mongoose.connect(dbUrl);

// 设置视图的根目录
app.set('views', './app/views/pages')
// 设置默认的模板引擎
app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.multipart());
app.use(cookieSession({
  secret: 'session',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

// 当有错误信息时提示
if('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(express.logger(':method :url :status'));
  app.locals.pretty = true; //可读性更好
  mongoose.set('debug', true);
}

// 路由
require('./config/routes')(app);

// 静态资源 bootstrap jquery
app.use(express.static(path.join(__dirname, 'public')))
// 挂载 时间模块 moment 到本地变量 locals
app.locals.moment = require('moment');
// 监听端口
app.listen(port)
console.log('movies start on port ' + port)

