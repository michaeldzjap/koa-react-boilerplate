export default {

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | The name of your application.
    |
    */

    name: 'Koa React Boilerplate',

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | The environment your application is currently running in.
    |
    */
    env: process.env.NODE_ENV || 'development',

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When debug mode is enabled, error messages will be displayed. If disabled,
    | a generic error page is shown.
    |
    */
    debug: process.env.APP_DEBUG || false,

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the application whenever it needs a reference to the app
    | URL and no request is available.
    |
    */
    url: process.env.APP_URL || 'http://localhost',

    /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | The port the application will be running on.
    |
    */
    port: process.env.PORT || 3000,

    title: 'Koa-React Boilerplate',

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Middleware Providers
    |--------------------------------------------------------------------------
    |
    | The middleware providers listed here will be automatically loaded on the
    | request to your application. Note: order matters here!
    |
    */

    providers: [
        'lib/core/providers/ErrorMiddlewareProvider',
        // 'app/server/providers/LoggerMiddlewareProvider',
        // 'app/server/providers/WebpackMiddlewareProvider',
        // 'app/server/providers/StaticMiddlewareProvider',
        // 'app/server/providers/CompressMiddlewareProvider',
        // 'app/server/providers/RouterMiddlewareProvider',
        // 'app/server/providers/RenderMiddlewareProvider'
    ]
};
