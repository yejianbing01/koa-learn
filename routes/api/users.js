const Router = require('koa-router');
const User = require('../../models/User');
const tools = require('../../config/tools');


const router = new Router();

/**
 * @route GET /api/users/test
 * @description 测试接口
 * @access 公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = { msg: 'Hello Koa Interfaces' };
});

/**
 * @route GET /api/users/register
 * @description 注册接口
 * @access 公开的
 */
router.post('/register', async ctx => {
    const findRes = await User.find({ email: ctx.request.body.code });
    if (findRes.length > 0) {
        ctx.status = 500;
        ctx.body = { msg: '邮箱已被占用' };
    } else {
        const user = new User({
            name: ctx.request.body.name,
            code: ctx.request.body.code,
            password: tools.encryptSync(ctx.request.body.password),
            avatar: tools.getGravatarUrlSync(ctx.request.body.email)
        });
        // 插入数据库
        await user
            .save()
            .then(res => {
                ctx.body = res;
            })
            .catch(err => {
                console.log(err);
            });
    }
});


module.exports = router.routes();