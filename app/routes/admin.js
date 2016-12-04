import Login from '../shared/views/login'

const title = process.env.ADMIN_TITLE

const routes = [
  {
    pattern: '/login',
    label: 'Login page',
    title: `${title} | Login`,
    component: Login
  }
]

export default routes
