import routesLik from './constants/routes.constants'
import Root from './pages/public/Root'
import SuccessPay from './pages/public/SuccessPay'

const commonRoutes = [
  {
    id: '2',
    path: routesLik.success,
    component: SuccessPay,
  },
  {
    id: '1',
    path: routesLik.root,
    component: Root,
  },
]

export const publicRouteConfig = [...commonRoutes]

export const privateRouteConfig = [...commonRoutes]
