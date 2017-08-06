import errorMiddleware from 'lib/core/errors/handler';

class ErrorMiddlewareProvider {

    register(app) {
        app.use(errorMiddleware());
    }

}

export default ErrorMiddlewareProvider;
