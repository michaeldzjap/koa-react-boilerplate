import React from 'react'
import { Match, Miss } from 'react-router'
import Helmet from 'react-helmet'

import Main from '../shared/views/layouts/main'
import Home from '../shared/views/home'
import Contact from '../shared/views/contact'
import Error from '../shared/views/error'
import NotFound from '../shared/views/notFound'

const title = 'Koa-React Biolerplate'

export const routes = {
  home: {
    exactly: true,
    pattern: '/',
    label: 'Home page',
    title: `${title} | Home`,
    component: Home,
    serverProps: Home.serverProps
  },
  contact: {
    pattern: '/about',
    label: 'About page',
    title: `${title} | Contact`,
    component: Contact
  }
}

const passPropsToRoute = ({route, props}) => (
  <div>
    <Helmet title={route.title} />
    <route.component {...props} routes={route.routes} />  // Pass the sub-routes down to keep nesting
  </div>
)

const matchWithSubRoutes = (key, i) => {
  const route = routes[key]
  return (<Match {...route} key={i} render={props => passPropsToRoute({route, props})} />)
}

export const makeRoutes = _ => {
  return (
    <Main>
      {Object.keys(routes).map(matchWithSubRoutes)}
      <Miss title={`${title} | Page not found`} component={NotFound} />
    </Main>
  )
}
