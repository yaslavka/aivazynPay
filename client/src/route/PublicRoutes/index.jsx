import React from 'react'
import {
  BrowserRouter as Router,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom'
import omit from 'lodash-es/omit'
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes'
import { publicRouteConfig } from '../../routes'
import routesLik from '../../constants/routes.constants'

function PublicRoutes() {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          {publicRouteConfig.map((route, index) => (
            <RouteWithSubRoutes key={index} {...omit(route, 'id')} />
          ))}
          <Redirect to={routesLik.root} />
        </Switch>
      </Router>
    </BrowserRouter>
  )
}

export default PublicRoutes
