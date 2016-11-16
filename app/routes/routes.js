import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from '../shared/views/layouts/main'
import Home from '../shared/views/home'
import Contact from '../shared/views/contact'
import Error from '../shared/views/error'

const routes = (
  <Route path="/" name="Main Layout" component={Main}>
    <IndexRoute name="Home" component={Home} />
    <Route path="/contact" name="Contact" component={Contact} />
    <Route path="*" name="Error" component={Error} />
  </Route>
)

export default routes
