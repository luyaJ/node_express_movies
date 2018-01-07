var mongoose = require('mongoose');
// 拿到导出的数据集模块
var UserSchema = require('../schemas/user');
// 编译生成Movie模型
var User = mongoose.model('User', UserSchema);

module.exports = User
