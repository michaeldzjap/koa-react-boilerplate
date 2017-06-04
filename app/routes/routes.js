import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';

import Main from '../shared/views/layouts/main';
import Home from '../shared/views/home';
import Contact from '../shared/views/contact';
import NotFound from '../shared/views/notFound';
import { requestInitialPostsData } from '../shared/reducers/posts';

const title = 'Koa-React Biolerplate';

export const routes = [
    {
        exactly: true,
        pattern: '/',
        label: 'Home page',
        title: `${title} | Home`,
        component: Home,
        requestInitialData: requestInitialPostsData
    },
    {
        pattern: '/contact',
        label: 'Contact page',
        title: `${title} | Contact`,
        component: Contact
    }
];

const passPropsToRoute = ({route, props}) => (
    <div>
        <Helmet title={route.title} />
        <route.component {...props} routes={route.routes} />  {/* Pass the sub-routes down to keep nesting */}
    </div>
);

const matchWithSubRoutes = (route, i) => (
    <Match {...route} key={`${route.label}-${i}`} render={props => passPropsToRoute({route, props})} />
);

export const makeRoutes = () => (
    <Main>
        {routes.map(matchWithSubRoutes)}
        <Miss title={`${title} | Page not found`} component={NotFound} />
    </Main>
);
