import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import userReducer from './user'
import cartReducer from './cart'
import singleProductReducer from './singleProduct'
import catalogReducer from './catalog'

const reducer = combineReducers({
  // user: userReducer
  cart: cartReducer,
  singleProduct: singleProductReducer,
  catalog: catalogReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'