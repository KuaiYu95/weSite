import React, { Component, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button, Empty, Alert } from 'antd'
import PackageBackTop from '../../components/BackTop'
// import User from '../User'
// import Todos from '../Todos';
// import Timeline from '../Timeline'
import NProgress from 'nprogress' 
import we from '../../asserts/pictures/we.jpeg'
import 'nprogress/nprogress.css'
import './index.less'

const User = lazy(() => import('../User'))
const Todos = lazy(() => import('../Todos'))
const TimeLine = lazy(() => import('../TimeLine'))


const { Header, Content, Footer, Sider } = Layout
export default class Ky extends Component<any, any> {
  state = {
    collapsed: false,
    selectedKeys: ['user'],
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
      <Layout style={{ minHeight: '100vh' }}>
        <PackageBackTop />
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className='ant-layout-sider-light'>
          <div className="logo">
            <img src={we} alt="logo" style={{width: '100%'}} />
          </div>
          <Menu defaultSelectedKeys={['user']} mode="inline" onSelect={this.handleClick}>
            {menuList.map((it: any) => {
              return <Menu.Item key={it.key}>
                  <Icon type={it.type} />
                  <span>{it.title}</span>
                </Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">{headTitle}</Header>
          <Content style={{ margin: '0 16px' }}>
            <Alert style={{ margin: '16px 0' }} type="info" message={
              <Breadcrumb >
                <Breadcrumb.Item>ky</Breadcrumb.Item>
                <Breadcrumb.Item>{selectedKeys[0]}</Breadcrumb.Item>
              </Breadcrumb>
            } />
            <div style={{ padding: 24, background: '#fff', minHeight: 570 }}>
              {bodyComponent ? 
                <Suspense fallback={<div>Loading...</div>}> {bodyComponent} </Suspense>
              : <Empty description="暂无数据" />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Link to="/"><Button type="dashed">返回首页</Button></Link>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const menuList = [
  {
    key: "user",
    type: "user",
    title: "我的主页",
  }, {
    key: "posts",
    type: "file",
    title: "帖子/论坛",
  }, {
    key: "article",
    type: "book",
    title: "文章/博客",
  }, {
    key: "todos",
    type: "unordered-list",
    title: "待办事项",
  }, {
    key: "diary",
    type: "read",
    title: "日记",
  }, {
    key: "foot",
    type: "flag",
    title: "我们的足迹",
  }, {
    key: "pictureWall",
    type: "picture",
    title: "照片墙"
  }, {
    key: "timeline",
    type: "line-chart",
    title: "时间线"
  }, {
    key: "tetris",
    type: "build",
    title: "俄罗斯方块"
  }
]

const content:any = {
  user: '关于我',
  posts: '总结的前端技术帖子与论坛',
  article: '发表过的文章与博客',
  diary: '记录生活的点点滴滴',
  foot: '所有去过的城市',
  todos: '计划中的事项与将来的打算',
  tetris: '俄罗斯方块',
  timeline: '变更状态记录',
  pictureWall: '定格的时光'
}

const component:any = {
  user: <User />,
  posts: null,
  article: null,
  diary: null,
  foot: null,
  todos: <Todos />,
  tetris: null,
  timeline: <TimeLine />,
  pictureWall: null,
}