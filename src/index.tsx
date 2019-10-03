import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Ky from './components/Ky'
import './index.less'
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <React.Suspense fallback={<div>loading...</div>}>
        <Route path='/ky' component={Ky}></Route>
        <Route path='/' component={Home}></Route>
      </React.Suspense>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
