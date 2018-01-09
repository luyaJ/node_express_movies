var mongoose = require('mongoose');
// 拿到导出的数据集模块
var CategorySchema = require('../schemas/category');
// 编译生成Movie模型
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
