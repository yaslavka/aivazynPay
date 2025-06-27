import React from 'react'
import dayjs from 'dayjs'
import PublicRoutes from './route/PublicRoutes'

function App() {
  dayjs.locale('ru')
  return <PublicRoutes />
}
export default App
