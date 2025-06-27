import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes'
import omit from 'lodash-es/omit'
import { privateRouteConfig } from '../../routes'

function PrivateRoutes() {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          {privateRouteConfig.map((route, index) => (
            <RouteWithSubRoutes key={index} {...omit(route, 'id')} />
          ))}
        </Switch>
      </Router>
    </BrowserRouter>
  )
}
export default PrivateRoutes
