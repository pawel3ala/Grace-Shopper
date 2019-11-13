import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import {QueryParamProvider} from 'use-query-params'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
