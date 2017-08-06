const errorMiddleware = () => (
    async (ctx, next) => {
        // catch all downstream errors here
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {message: err.message};
            ctx.app.emit('error', err, ctx);
        }
    }
);

export default errorMiddleware;
