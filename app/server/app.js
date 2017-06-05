/*eslint no-console: ["error", { allow: ["log"] }]*/

import path from 'path';
import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';
import webpackMiddleware from 'koa-webpack';
import compressible from 'compressible';

import { errorMiddleware, routerMiddleware/*, renderMiddleware*/ } from './middleware';
import config from '../../config';
import webpackConfig from '../../webpack.config.development';

const app = new Koa();

if (config.app.env === 'development') {
    app.use(logger());
    app.use(webpackMiddleware({
        config: webpackConfig,
        dev: {
            publicPath: webpackConfig.output.publicPath,
            stats: {colors: true}
        }
    }));
}

app.use(errorMiddleware());

app.use(serve(path.join(__dirname, '../../public')));

const regex = RegExp('/event\-stream/i');
app.use(compress({
    filter: type => !(regex.test(type)) && compressible(type),
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(routerMiddleware());

// app.use(renderMiddleware());

http.createServer(app.callback()).listen(config.app.port, () => {
    console.log(`Koa started in ${app.env} mode on ${config.app.url}:${config.app.port}; press Ctrl-C to terminate.`);
});
