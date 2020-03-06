import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Empty } from 'antd'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
import './index.less'

let PackageBackTop = Loadable({
  loader:()=>import('../../components/BackTop'),
  loading: Loading
})
let User = Loadable({
  loader:()=>import('../User'),
  loading: Loading
})
let Blog = Loadable({
  loader:()=>import('../Blog'),
  loading: Loading
})
let Diary = Loadable({
  loader:()=>import('../Diary'),
  loading: Loading
})
let Todos = Loadable({
  loader:()=>import('../Todos'),
  loading: Loading
})
let TimeLine = Loadable({
  loader:()=>import('../TimeLine'),
  loading: Loading
})
let PictureWall = Loadable({
  loader:()=>import('../PictureWall'),
  loading: Loading
})
let FootPrint = Loadable({
  loader:()=>import('../FootPrint'),
  loading: Loading
})

const { Header, Content, Sider } = Layout
export default class Ky extends Component<any, any> {
  state = {
    collapsed: true,
    selectedKeys: [`${localStorage.getItem('navLink') || 'user'}`],
  }

  componentWillMount() {
    NProgress.start()
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

  onCollapse = (collapsed:boolean) => {
    this.setState({ collapsed });
  }

  handleClick = ({ selectedKeys }:any) => {
    this.setState({
      selectedKeys
    })
  }

  render() {
    const { collapsed, selectedKeys } = this.state
    const headTitle = content[selectedKeys[0]]
    const bodyComponent = component[selectedKeys[0]]
    return (
      <Layout style={{ height: '100vh' }}>
        <PackageBackTop />
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className='ant-layout-sider-light'>
          <div className="logo">
            KY's Site
          </div>
          <Menu defaultSelectedKeys={selectedKeys} mode="inline" onSelect={this.handleClick}>
            {menuList.map((it: any) => {
              return <Menu.Item key={it.key} onClick={() => localStorage.setItem('navLink', it.key)}>
                  <Link to={'/ky/' + it.key}>
                    <Icon type={it.type} />
                    <span>{it.title}</span>
                  </Link>
                </Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className="ky-header">{headTitle}</Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', height: 'calc(100vh - 96px)', margin: '16px 0', overflow: 'scorll' }}>
              {bodyComponent ? bodyComponent : <Empty description="暂无数据" />}
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

const content:any = {
  user: '主页', 
  blog: '博客',
  diary: '日记',
  footPrint: '足迹',
  todos: '待办事项',
  // timeline: '变更状态记录',
  pictureWall: '照片墙',
  message: '留言板'
}

const component:any = {
  user: <User />,
  blog: <Blog />,
  diary: <Diary />,
  footPrint: <FootPrint />,
  todos: <Todos />,
  // timeline: <TimeLine />,
  // pictureWall: <PictureWall />,
}