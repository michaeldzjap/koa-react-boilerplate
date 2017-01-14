/**
 * Backend routing. We will keep backend routing as minimal as possible and leave
 * most of the routing related decision making to React Router. We will only use
 * the backend router to make a separation between the admin and app parts.
 */

import Router from 'koa-router'
import { reactRouterMiddleware } from './middleware'

import appRoutes from '../routes/app'
import config from '../../config'

const router = new Router()

// Listen for all routes that start with 'admin'
router.get('admin', '/admin/(.*)?', async (ctx, next) => {
  console.log('admin')
})

// Listen for all remaining routes
router.get('app', '*', reactRouterMiddleware({title: config.app.appTitle, routes: appRoutes}))

export default router
