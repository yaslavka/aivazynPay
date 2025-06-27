import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootSaga from '../../sagas'
import rootReducer from '../../redux'

const persistConfig = {
  key: 'root',
  storage,
}

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, routerMiddleware(history)]
const persistedReducer = persistReducer(persistConfig, rootReducer(history))

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      predicate: (getState, action) => ![].includes(action.type),
      collapsed: true,
    }),
  )
}
const enhancers = [applyMiddleware(...middleware, thunk)]
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose
export default function configureStore() {
  const enhancer = composeEnhancers(...enhancers)
  const store = createStore(persistedReducer, enhancer)
  const persist = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return { store, persist }
}
