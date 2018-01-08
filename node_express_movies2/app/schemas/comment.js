/*
* 模式
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 放与电影有关的条目信息
var CommentSchema = new mongoose.Schema({
  movie: {type: ObjectId, ref: 'Movie'},
  from: {type: ObjectId, ref: 'User'},
  reply: [{
    from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String,
  }],
  content: String,
  // 创建及更新时间
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 每次存储数据之前，我们都调用一下这个方法
CommentSchema.pre('save', function(next){
  // 如果是新加的
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})

// 查询静态方法
CommentSchema.statics = {
  // 用来取出当前数据库所有数据
  fetch: function(cb){
    return this
      .find()
      .sort('meta.updateAt')
      .exec(cb);
  },
  // 查询当前数据
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

module.exports = CommentSchema;