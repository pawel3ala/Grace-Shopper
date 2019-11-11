import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {reducer as formReducer} from 'redux-form'
import userReducer from './user'
import cartReducer from './cart'
import singleProductReducer from './singleProduct'
import catalogReducer from './catalog'
import addressReducer from './address'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  singleProduct: singleProductReducer,
  catalog: catalogReducer,
  address: addressReducer,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
