import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import appReducer from './app.reducer'

const rootReducer = (history) =>
  combineReducers({
    app: appReducer,
    router: connectRouter(history),
  })

export default rootReducer
