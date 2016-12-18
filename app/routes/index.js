import React from 'react'
import { Match, Miss } from 'react-router'
import Helmet from 'react-helmet'

import NotFound from '../shared/views/notFound'

const passPropsToRoute = ({route, props}) => (
  <div>
    <Helmet title={route.title} />
    <route.component {...props} routes={route.routes} />  {/* Pass the sub-routes down to keep nesting */}
  </div>
)

const matchWithSubRoutes = (route, i) => {
  return (<Match {...route} key={`${route.label}-${i}`} render={props => passPropsToRoute({route, props})} />)
}

export const makeRoutes = ({layout: Layout, head: Head, routes}) => {
  return (
    <Layout>
      {Head}
      {routes.map(matchWithSubRoutes)}
      <Miss component={NotFound} />
    </Layout>
  )
}
