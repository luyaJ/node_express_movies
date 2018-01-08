/*
 * 控制与电影相关的请求
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');

// detail page
exports.detail = function (req, res) {
  var id = req.params.id;
  // 在模式中定义好静态方法
  Movie.findById(id, function (err, movie) {
    Comment.find({movie: id}, function(err, comments) {
      console.log(comments);
      res.render('detail', {
        // title: 'movieWeb ' + movie.title,
        title: 'movieWeb',
        movie: movie,
        comments: comments
      });
    });   
  });
}

// admin new page
exports.new = function (req, res) {
  res.render('admin', {
    title: 'movieWeb 后台录入页',
    movie: {
      title: '',
      doctor: '',
      county: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
}

// admin post movie 拿到从后台录入页传来的信息
exports.save = function (req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  // 如果不是未定义
  if (id !== 'undefined') {
    Movie.findById(id, function (err, movie) {
      if (err) {
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
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      });
    });
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

    _movie.save(function (err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id)
    });
  }
}

// admin update movie
exports.update = function (req, res) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }
      res.render('admin', {
        title: 'movieWeb 后台更新页',
        movie: movie
      });
    });
  }
}

// list page
exports.list = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('list', {
      title: 'movieWeb 列表页',
      movies: movies
    });
  });
}

// list delete movie
exports.del = function (req, res) {
  var id = req.query.id;
  if (id) {
    Movie.remove({
      _id: id
    }, function (err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        });
      }
    });
  }
}