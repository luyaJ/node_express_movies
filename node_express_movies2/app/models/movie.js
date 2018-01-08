/*
* 模型
*/
var mongoose = require('mongoose');
// 拿到导出的数据集模块
var MovieSchema = require('../schemas/movie');
// 编译生成Movie模型
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie
