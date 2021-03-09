module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(111111111);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            msg: err.message
        };
    }
}