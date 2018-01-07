var express = require('express');
// 告诉express，有需要样式的去bower-component中找
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://101.132.128.72:27017/movie');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cookieSession({secret: 'app_1'}));
// 静态资源 bootstrap jquery
app.use(express.static(path.join(__dirname, 'public')))
// 挂载 时间模块 moment 到本地变量 locals
app.locals.moment = require('moment');

// 设置视图的根目录
app.set('views', './views/pages')
// 设置默认的模板引擎
app.set('view engine', 'pug')
// 监听端口
app.listen(port)
console.log('movies start on port ' + port)

/*
* 以下是路由
*/

// index page
app.get('/', function (req, res){
  Movie.fetch(function (err, movies){
    if(err) {
      console.log(err);
    }
    res.render('index', {
      title: 'movieWeb 首页',
      movies: movies
    })
  });
});

// signup
app.post('/user/signup', function(req, res){
  var _user = req.body.user;
  // var _user= req.params.user;
  var user = new User(_user);
  user.save(function(err, user){
    if(err){
      console.log(err);
    }
    console.log(user);
  })
})

// detail page
app.get('/movie/:id', function(req, res){
  var id = req.params.id
  // 在模式中定义好静态方法
  Movie.findById(id, function(err, movie){
    res.render('detail', {
      // title: 'movieWeb ' + movie.title,
      title: 'movieWeb',
      movie: movie
    })
  })
})

// admin page
app.get('/admin/new', function(req, res){
  res.render('admin', {
    title: 'movieWeb 后台录入页',
    movie:{
      title: '',
      doctor: '',
      county: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
});

// admin post movie 拿到从后台录入页传来的信息
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  // 如果不是未定义
  if(id !== 'undefined'){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);
      }
      if (movie == undefined) {
        movie = new Movie({
          doctor: movieObj.doctor,
          title: movieObj.title,
          country: movieObj.country,
          language: movieObj.language,
          year: movieObj.year,
          poster: movieObj.poster,
          summary: movieObj.summary,
          flash: movieObj.flash
        });
       }
      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if(err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });

    _movie.save(function(err, movie) {
      if(err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id)
    })
  }
});

// admin update movie
app.get('/admin/update/:id', function (req, res){
  var id = req.params.id;
  if(id) {
    Movie.findById(id, function (err, movie) {
      if(err) {
        console.log(err);
      }
      res.render('admin', {
        title: 'movieWeb 后台更新页',
        movie: movie
      })
    })
  }
});

// list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if(err) {
      console.log(err);
    }
    res.render('list', {
      title: 'movieWeb 列表页',
      movies: movies
    })
  });
});

// list delete movie
app.delete('/admin/list', function(req, res){
  var id = req.query.id;
  if(id) {
    Movie.remove({_id: id}, function(err, movie){
      if(err) {
        console.log(err);
      } else {
        res.json({success: 1})
      }
    })
  }
})