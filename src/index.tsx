import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Ky from './containers/Ky'
import './index.less'
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <BrowserRouter>
    <React.Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path='/' component={Ky}></Route>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
