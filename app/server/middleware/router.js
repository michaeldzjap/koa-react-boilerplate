import React from 'react';
import { matchPath, StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../../shared/store/configureStore';
import { routes, makeRoutes } from '../../routes/routes';
import { generateInitialState } from '../../shared/reducers';

/**
 * Walk through (nested) routes to extract requestInitialData funcs if location
 * matches route pattern
 *
 * @param String location
 * @param Array routes
 * @return Array requestInitialData
 */
const extractInitialDataRequests = (pathname: String, routes: Array) => {
    const dataRequests = [];
    const collect = routes => {
        for (const route of routes) {
            if (matchPath(route.pattern, {pathname}, route.exactly || null, route.parent || null) && route.hasOwnProperty('requestInitialData')) {
                dataRequests.push(route.requestInitialData);
            }
            if (route.hasOwnProperty('routes')) { // recursion for nested routes
                collect(route.routes);
            }
        }
    };
    collect(routes);

    return dataRequests;
};

const routerMiddleware = () => {
    return async (ctx, next) => {
        const initialState = generateInitialState();
        const initialDataRequests = extractInitialDataRequests(ctx.url, routes);

        if (initialDataRequests.length) {
            const initialData = await Promise.all(
                initialDataRequests.map(initialDataRequest => Promise.resolve(initialDataRequest()))
            );
            ctx.initialState = Object.assign({}, initialState, ...initialData);  // Attach initial state to ctx
        } else {
            ctx.initialState = initialState;
        }

        const store = configureStore(ctx.initialState);
        const context = {};
        ctx.routerContext = (
            <Provider store={store}>
                <StaticRouter location={ctx.url} context={context}>
                    {makeRoutes()}
                </StaticRouter>
            </Provider>
        );

        if (context.url) {
            // Somewhere a <Redirect /> was rendered
            ctx.status = 301;
            ctx.redirect(context.url);
        } else {
            await next();
        }
    };
};

export default routerMiddleware;
