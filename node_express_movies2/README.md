## 在根目录下安装：
```bash
npm install express pug moment mongoose
npm install bower -g
bower install bootstrap
```

上面这条命令在windows环境下，出现错Bower : ENOGIT git is not installed or not in the PATH，最简单的方法就是使用git bash来代替cmd。

## grunt安装

```bash
# 安装grunt
npm install grunt -g
# 安装grunt命令行接口
npm install grunt-cli -g
# 安装加载任务的插件(--save-dev会自动添加到依赖中去)
npm install grunt-contrib-watch --save-dev
npm install grunt-nodemon --save-dev
npm install grunt-concurrent --save-dev
```
之后在根目录下建一个`gruntfile.js`

## grunt错误
```bash
$ grunt
grunt-cli: The grunt command line interface (v1.2.0)

Fatal error: Unable to find local grunt.

If you're seeing this message, grunt hasn't been installed locally to
your project. For more information about installing and configuring grunt,
please see the Getting Started guide:

http://gruntjs.com/getting-started
```

以上的错误，解决方法为：
```bash
$ npm install grunt --save-dev
```

在使用`grunt`启动本地服务：
```bash
$ grunt
Running "concurrent:tasks" (concurrent) task
    Running "nodemon:dev" (nodemon) task
    [nodemon] 1.14.8
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app.js`
    Running "watch" task
    Waiting...
    movies start on port 3000
```

## 密码处理

安装bcrypt模块：
```bash
$ npm install bcryptjs  --save
```

## 利用mongodb做回话的持久化

```bash
# 安装
$ npm install connect-mongo --save
# 在入口文件引入
var mongoStore = require('connect-mongo')(express);
# 在cookieSession中配置
```

## 单元测试

安装mocha：
```bash
$ npm install grunt-mocha-test --save
```

在gruntfile.js中加载模块：
```bash
grunt.loadNpmTasks('grunt-mocha-test');  

# 注册任务
grunt.registerTask('test', ['mochaTest']);

# 配置任务
mochaTest: {
    options: {
    reporter: 'spec'
    },
    src: ['test/**/*.js']
}
```

接着在根目录下新建文件`/test/user/user.js`,写测试用例。

安装should：
```bash
$ npm install should --save
```

