import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import Loadable from 'react-loadable'
// import Loading from '../../components/Loading'
import Home from '../../components/Home'
import Ky from '../Ky'
import Yyj from '../Yyj'
// let Home = Loadable({
//   loader: () => import('../../components/Home'),
//   loading: Loading
// })
// let Ky = Loadable({
//   loader: () => import('../Ky'),
//   loading: Loading
// })
// let Yyj = Loadable({
//   loader: () => import('../Yyj'),
//   loading: Loading
// })

export default class Main extends Component {

  render() {
    return (
      <Switch>
        <Route path='/Yyj' component={Yyj} />
        <Route path='/ky' component={Ky} />
        <Route path='/' component={Home} />
      </Switch>
    )
  }
}