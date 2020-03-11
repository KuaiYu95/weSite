import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Icon, Empty } from 'antd'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.less'

let PackageBackTop = Loadable({
  loader: () => import('../../components/BackTop'),
  loading: Loading
})
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

const { Header, Content, Sider } = Layout
export default class Ky extends Component<any, any> {
  state = {
    collapsed: true,
    selectedKeys: ['user'],
  }

  componentWillMount() {
    NProgress.start()
    let pathname = window.location.pathname.slice(1)
    this.setState({ selectedKeys: [pathname] })
  }

  componentWillUpdate() {
    NProgress.start()
  }

  componentDidMount() {
    NProgress.done()
  }

  componentDidUpdate() {
    NProgress.done()
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  }

  handleClick = ({ selectedKeys }: any) => {
    this.setState({ selectedKeys })
  }

  renderEmpty() {
    return <Empty description="开发中，尽情期待吧" style={{ color: '#fff', marginTop: '30vh', fontSize: 20, lineHeight: '48px' }} />
  }

  render() {
    const { collapsed, selectedKeys } = this.state
    const headTitle = content[selectedKeys[0]]
    return (
      <Layout style={{ height: '100vh' }}>
        <PackageBackTop />
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className='ant-layout-sider-light'>
          <div className="logo">
            YYJ
          </div>
          <Menu defaultSelectedKeys={selectedKeys} mode="inline" onSelect={this.handleClick}>
            {menuList.map((it: any) => {
              return <Menu.Item key={it.key} onClick={() => localStorage.setItem('navLink', it.key)}>
                <Link to={it.key}>
                  <Icon type={it.type} />
                  <span>{it.title}</span>
                </Link>
              </Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header id="header-title" className="ky-header">{headTitle}</Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="content" style={{ height: 'calc(100vh - 96px)', margin: '16px 0' }}>
              <div id='stars'></div>
              <div id='stars2'></div>
              <div id='stars3'></div>
              <Switch>
                <Route path='/blog' component={Blog} />
                <Route path='/diary' component={Diary} />
                <Route path='/footPrint' component={FootPrint} />
                <Route path='/pictureWall' component={this.renderEmpty} />
                <Route path='/todos' component={Todos} />
                <Route path='/user' component={User} />
                <Route path='/message' component={this.renderEmpty} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const menuList = [
  {
    key: "user",
    type: "user",
    title: "主页",
  }, {
    key: "blog",
    type: "file",
    title: "博客",
  }, {
    key: "diary",
    type: "read",
    title: "日记",
  }, {
    key: "footPrint",
    type: "flag",
    title: "足迹",
  }, {
    key: "pictureWall",
    type: "picture",
    title: "照片墙"
  }, {
    key: "todos",
    type: "unordered-list",
    title: "待办事项",
  }, {
    //   key: "timeline",
    //   type: "line-chart",
    //   title: "时间线"
    // }, {
    key: 'message',
    type: 'mail',
    title: '留言板',
  }
]

const content: any = {
  user: '主页',
  blog: '博客',
  diary: '日记',
  footPrint: '足迹',
  todos: '待办事项',
  // timeline: '变更状态记录',
  pictureWall: '照片墙',
  message: '留言板'
}