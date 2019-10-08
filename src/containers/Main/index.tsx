import React, { Component } from 'react'
import Home from '../../components/Home'
import Ky from '../Ky'
import { Route, Switch } from 'react-router-dom'


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