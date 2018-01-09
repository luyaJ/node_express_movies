/*
 * 控制与电影相关的请求
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');

// detail page
exports.detail = function (req, res) {
  var id = req.params.id;
  // 在模式中定义好静态方法
  Movie.findById(id, function (err, movie) {
    Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function (err, comments) {
        res.render('detail', {
          title: 'movieWeb 详情页',
          movie: movie,
          comments: comments
        });
      });
  });
}

// admin new page
exports.new = function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('admin', {
      title: 'movieWeb 后台录入页',
      categories: categories,
      movie: {}
    });
  });
}

// admin post movie 拿到从后台录入页传来的信息
exports.save = function (req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  // 如果不是未定义
  if (id) {
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
    _movie = new Movie(movieObj);

    var categoryId = movieObj.category;
    var categoryName = movieObj.categoryName;

    _movie.save(function (err, movie) {
      if (err) {
        console.log(err);
      }

      if(categoryId){
        Category.findById(categoryId, function (err, category) {
          category.movies.push(_movie._id);
          category.save(function (err, category) {
            res.redirect('/movie/' + movie._id)
          });
        });
      } else if(categoryName){
        var category = new Category({
          name: categoryName
        })
      }
    });
  }
}

// admin update movie
exports.update = function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(id, function(err, movie) {
      Category.find({}, function(err, categories) {
        res.render('admin', {
          title: 'movieWeb 后台更新页',
          movie: movie,
          categories: categories
        })
      })
    })
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