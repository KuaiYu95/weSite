import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import Home from '../../components/Home'
import Ky from '../Ky'
import Yyj from '../Yyj'

export default class Main extends Component {

  render() {
    return (
      <Switch>
        <Route path='/Yyj' component={Yyj} />
        <Route path='/' component={Ky} />
      </Switch>
    )
  }
}