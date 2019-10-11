import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../components/Home'
import Ky from '../Ky'


export default class Main extends Component {

  render() {
    return (
      <Switch>
        <Route path='/ky' component={Ky} />
        <Route path='/' component={Home} />
      </Switch>
    )
  }
}