const Router = require('koa-router');
const User = require('../../models/User');
const tools = require('../../config/tools');
const passport = require('koa-passport');

// input验证
const validateRegisterInput = require('../../validation/register');

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
    const { errors, isValid } = validateRegisterInput(ctx.request.body);
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
    }

    const findRes = await User.find({ email: ctx.request.body.email });
    if (findRes.length > 0) {
        ctx.status = 500;
        ctx.body = { msg: '邮箱已被占用' };
    } else {
        const user = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
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


router.post('/login', async ctx => {
    const user = await User.findOne({ email: ctx.request.body.email });
    const userPassword = user.password;
    const password = ctx.request.body.password;
    if (user) {
        if (tools.compareSync(password, userPassword)) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar };
            const token = tools.getToken({ payload });
            ctx.status = 200;
            ctx.body = { success: true, token: "Bearer " + token };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '密码错误' };
        }
    } else {
        ctx.status = 404;
        ctx.body = { msg: '当前用户不存在' };
    }
});


router.get('/current', passport.authenticate('jwt', { session: false }), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar
    };
});


module.exports = router.routes();