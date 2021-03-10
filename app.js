const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
// config
const db = require('./config/keys').mongoURI;
// models
const users = require('./routes/api/users');



// 实例化koa
const app = new Koa();
const router = new Router();

app.use(bodyParser());


// token解析
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// 配置路由地址
router.use('/api/users', users);
// 配置路由
app.use(router.routes()).use(router.allowedMethods());



// 连接数据库
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb Connected...');
});
// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve started on ${port}`);
});