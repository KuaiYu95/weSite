import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Main from '../Main';
import './index.less'

const { Header, Content, Sider } = Layout
export default class Ky extends Component<any, any> {
  pathname = ''

  state = {
    collapsed: true,
    selectedKeys: [],
  }

  componentWillMount() {
    let pathname1 = window.location.pathname.slice(1)
    let pathname2 = localStorage.getItem('pathname')
    if (pathname1 === '' && pathname2 === null) {
      this.pathname = 'user'
      window.location.pathname = '/user'
      localStorage.setItem('pathname', 'user')
    } else if (pathname1 !== pathname2) {
      if (pathname1) {
        this.pathname = pathname1
        localStorage.setItem('pathname', pathname1)
      } else if (pathname2) {
        this.pathname = pathname2
        localStorage.setItem('pathname', pathname2)
      }
      window.location.pathname = '/' + this.pathname
    }
    this.setState({ selectedKeys: [this.pathname] })
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  }

  handleClick = ({ selectedKeys }: any) => {
    this.setState({ selectedKeys })
  }

  render() {
    const { collapsed, selectedKeys } = this.state
    const headTitle = content[selectedKeys[0]]
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className='ant-layout-sider-light'>
          <div className="logo">
            YYJ
          </div>
          <Menu defaultSelectedKeys={selectedKeys} mode="inline" onSelect={this.handleClick}>
            {menuList.map((it: any) => {
              return <Menu.Item key={it.key} onClick={() => localStorage.setItem('pathname', it.key)}>
                <Link to={'/' + it.key}>
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
              <Main />
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