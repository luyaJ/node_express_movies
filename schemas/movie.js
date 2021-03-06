/*
* 模式
*/
var mongoose = require('mongoose');

// 放与电影有关的条目信息
var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
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
MovieSchema.pre('save', function(next){
  // 如果是新加的
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})

// 查询静态方法
MovieSchema.statics = {
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

module.exports = MovieSchema;