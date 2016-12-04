import React from 'react'
import { Match, Miss } from 'react-router'
import Helmet from 'react-helmet'

import Main from '../shared/views/layouts/main'
import Admin from '../shared/views/layouts/admin'
import NotFound from '../shared/views/notFound'
import appRoutes from './app'
import adminRoutes from './admin'

const passPropsToRoute = ({route, props}) => (
  <div>
    <Helmet title={route.title} />
    <route.component {...props} routes={route.routes} />  {/* Pass the sub-routes down to keep nesting */}
  </div>
)

const matchWithSubRoutes = (route, i) => {
  return (<Match {...route} key={`${route.label}-${i}`} render={props => passPropsToRoute({route, props})} />)
}

export const makeAppRoutes = _ => {
  return (
    <Main>
      {appRoutes.map(matchWithSubRoutes)}
      <Miss title={`${process.env.APP_TITLE} | Page not found`} component={NotFound} />
    </Main>
  )
}

export const makeAdminRoutes = _ => {
  return (
    <Admin>
      {adminRoutes.map(matchWithSubRoutes)}
      <Miss title={`${process.env.ADMIN_TITLE} | Page not found`} component={NotFound} />
    </Admin>
  )
}
