import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './containers/Main'
import './index.less'
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <BrowserRouter>
    <React.Suspense fallback={<div>loading...</div>}>
      <Route path='/' component={Main}></Route>
    </React.Suspense>
  </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
