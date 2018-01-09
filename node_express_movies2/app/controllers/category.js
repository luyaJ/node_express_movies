var Category = require('../models/Category');

// category_admin page
exports.new = function (req, res) {
  res.render('category_admin', {
    title: 'movieWeb 后台分类录入页',
    category: {}
  });
}

// category_admin post movie 拿到从后台录入页传来的信息
exports.save = function (req, res) {
  var _category = req.body.category;
  var category = new Category(_category);

  category.save(function (err, category) {
    if (err) {
      console.log(err);
    }
    res.redirect('/admin/category/list')
  });
}

// catelist page
exports.list = function (req, res) {
  Category.fetch(function (err, categories) {
    if (err) {
      console.log(err);
    }
    res.render('categorylist', {
      title: 'movieWeb 分类列表页',
      categories: categories
    });
  });
}
