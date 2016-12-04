import Home from '../shared/views/home'
import Contact from '../shared/views/contact'
import { requestInitialPostsData } from '../shared/reducers/posts'

const title = process.env.APP_TITLE

const routes = [
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
]

export default routes
