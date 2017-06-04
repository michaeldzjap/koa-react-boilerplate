import { PassThrough } from 'stream';
import Helmet from 'react-helmet';

import HTMLStream from '../html';

const renderMiddleware = () => (
    async ctx => {
        const stream = new PassThrough();
        const helmet = Helmet.rewind();
        const body = HTMLStream({initialState: ctx.initialState, markup: ctx.routerContext, helmet});
        stream.write('<!DOCTYPE html>');
        body.pipe(stream, {end: false});
        body.on('end', () => stream.end());
        ctx.type = 'text/html';
        ctx.body = stream;
    }
);

export default renderMiddleware;
