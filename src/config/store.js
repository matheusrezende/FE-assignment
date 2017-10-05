import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import saga from '../sagas/saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = []

middlewares.push(sagaMiddleware)

let composeEnhancers
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({})
  middlewares.push(logger) // redux logger only in dev environment
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // if in dev environment enable redux-devtools to help with debugging
} else {
  composeEnhancers = compose
}
const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducer)
export default store
sagaMiddleware.run(saga) // start the saga middleware
