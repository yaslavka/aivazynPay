import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import reportWebVitals from './reportWebVitals'
import configureStore, { history } from './config/store'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.css'
import 'dayjs/locale/ru'

export const { store, persist } = configureStore()
dayjs.extend(isBetween)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <App history={history} />
    </PersistGate>
  </Provider>,
)
reportWebVitals()
serviceWorker.unregister()
