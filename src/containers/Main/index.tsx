import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Empty } from 'antd'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'

let User = Loadable({
  loader: () => import('../User'),
  loading: Loading
})
let Blog = Loadable({
  loader: () => import('../Blog'),
  loading: Loading
})
let Diary = Loadable({
  loader: () => import('../Diary'),
  loading: Loading
})
let Todos = Loadable({
  loader: () => import('../Todos'),
  loading: Loading
})
// let TimeLine = Loadable({
//   loader:()=>import('../TimeLine'),
//   loading: Loading
// })
// let PictureWall = Loadable({
//   loader:()=>import('../PictureWall'),
//   loading: Loading
// })
let FootPrint = Loadable({
  loader: () => import('../FootPrint'),
  loading: Loading
})

export default class Main extends Component<any, any> {

  renderEmpty() {
    return <Empty description="对不起，您没有访问权限" style={{ color: '#fff', marginTop: '30vh'}} />
  }

  renderSpace() {
    return <Empty description="对不起，没找到你想要的页面" style={{ color: '#fff', marginTop: '30vh'}} />
  }

  render() {
    const confirm = localStorage.getItem('confirm') === '0913'
    return (
      <Switch>
        <Route path='/blog' component={Blog} />
        <Route path='/diary' component={confirm ? Diary : this.renderEmpty} />
        <Route path='/footPrint' component={confirm ? FootPrint : this.renderEmpty} />
        <Route path='/pictureWall' component={this.renderEmpty} />
        <Route path='/todos' component={Todos} />
        <Route path='/message' component={this.renderEmpty} />
        <Route path='/user' component={User} />
        <Route path='/' component={this.renderSpace} />
      </Switch>
    )
  }
}