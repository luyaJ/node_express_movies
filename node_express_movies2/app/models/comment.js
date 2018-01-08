/*
* 模型
*/
var mongoose = require('mongoose');
// 拿到导出的数据集模块
var CommentSchema = require('../schemas/comment');
// 编译生成Movie模型
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
