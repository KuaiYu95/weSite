import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Avatar, Icon, Input, Descriptions, Statistic, Row, Col, message, Form, Select, notification } from 'antd'
import { getTotal, getUrl, addUrl } from '../../api'
import './index.less'

const { Search } = Input;
const { Option } = Select;
const { Item } = Form
class UrlForm extends Component<any> {
  state = {
    visible: false,
    urlCount: 0,
    blogCount: 0,
    todoCount: 0,
    dailyCount: 0,
    footCount: 0,
    photoCount: 0,
    featCount: 0,
    money: 0,
    urls: new Array(20).fill([]),
    newUrls: new Array(20).fill([]),
    title: '',
    url: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    getTotal({}).then((res: any) => {
      if (res.data && res.data.success) {
        this.setState({ ...res.data.data[0] })
      } else {
        message.error('数据请求失败，请查看网络！')
      }
    })
    getUrl({}).then((res: any) => {
      if (res.data && res.data.success) {
        let newUrls: any = new Array(20).fill(undefined).map(() => [])
        res.data.data.map((it: any) => {
          newUrls[+it.classis].push(it)
          return null
        })
        this.setState({ urls: newUrls, newUrls })
      } else {
        message.error('数据请求失败，请查看网络！')
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleSubmit = () => {
    this.props.form.validateFields((err: any, values: any) => {
      let time = new Date().getTime()
      if (!err) {
        let { title, url } = values
        if (title.trim().length <=0) {
          message.error('请输入标题')
          return
        } 
        if (url.length <= 0 || !url.includes('http') || !url.includes('://') || !url.includes('.')) {
          message.error('请将链接补充完整（http 或 https）')
          return
        }
        addUrl({ ...values, time }).then((res: any) => {
          notification['success']({
            message: '操作提示',
            description: `添加成功，${values.title}`,
            duration: 2
          })
          if (res.data.success) {
            let { urls } = this.state
            let { classis, url, title } = values
            let newUrls = urls.map((it: any, idx: number) => {
              if (idx === +values.classis) {
                return [...it, { classis, url, title, time }]
              } else {
                return it
              }
            })
            this.setState({ newUrls, urls: newUrls, title: '', url: '' })
          }
        }).catch((error: any) => {
          notification['error']({
            message: '操作提示',
            description: '添加失败，返回报错',
            duration: 2
          })
        })
        this.setState({
          visible: false,
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onSearch = (value: string) => {
    let { urls } = this.state
    if (value.trim() === '') {
      this.setState({ newUrls: urls })
    } else {
      let newUrls = urls.map((urlArr: any, idx: number) => {
        if (idx === 0) {
          return urlArr
        } else {
          return urlArr.filter((it: any) => {
            return it.title.includes(value)
          })
        }
      })
      this.setState({ newUrls })
    }
  }

  render() {
    const { blogCount, todoCount, dailyCount, footCount, photoCount, newUrls, visible, urlCount, title, url } = this.state
    const renderHeader = (
      <div className='avatar-user'>
        <Avatar size="small" src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/5b019b627dcc672321b168667d7337e0-88-88.gif" />
        <span className="username">闫永娟</span>
      </div>
    )
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='my-home'>
        <div className='article-list'>
          <div className='visit-list'>
            <span>经常访问：</span>
            {newUrls[0].map((it: any, idx: number) => {
              return <span key={it.time}>
                <a style={{ borderBottom: '1px solid #8fb6d9' }} href={it.url} target="blank">{it.title}</a><span className="int"></span>
              </span>
            })}
            <span><Icon type="plus-circle" onClick={this.showModal} /></span><span className="int"></span>
            <Modal
              title="添加收藏"
              visible={visible}
              okText="添加"
              onOk={this.handleSubmit}
              onCancel={this.handleCancel}
            >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Item label="分类" key='classis'>
                  {getFieldDecorator('classis', {
                    initialValue: '0'
                  })(
                    <Select>
                      {
                        Object.keys(urlClassis).map(it => {
                          return <Option value={it} key={it}>{urlClassis[it]}</Option>
                        })
                      }
                    </Select>
                  )}
                </Item>
                <Item label="标题" key='title'>
                  {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{ required: true, message: '请输入标题!' }]
                  })(<Input />)}
                </Item>
                <Item label="链接" key='url'>
                  {getFieldDecorator('url', {
                    initialValue: url,
                    rules: [{ required: true, message: '请输入链接!' }]
                  })(<Input />)}
                </Item>
              </Form>
            </Modal>
          </div>
          {newUrls.map((it: any, idx: number) => {
            if (idx === 0) return null
            return it.length === 0 ? null : <div className='list' key={idx}>
              <h4 style={{ paddingLeft: 10 }}>{urlClassis[+idx]}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {it.map((item: any) => {
                  return <li className="list-item" key={item.time}>
                    <a href={item.url} rel="noopener noreferrer" target='_blank' className='ellipsis'><Icon type="link" style={{ margin: '0 10px' }} /> {item.title}</a>
                  </li>
                })}
              </ul>
            </div>
          })}
        </div>
        <div className='side-bar'>
          <div className="search">
            <Search
              size='small'
              placeholder="搜索"
              onSearch={this.onSearch}
            />
          </div>
          <div className="personal">
            <Descriptions title={renderHeader} column={2} size="small">
              <Descriptions.Item label={<Icon type="wechat" />}>17797776003</Descriptions.Item>
              <Descriptions.Item label={<Icon type="environment" />}>浙江杭州</Descriptions.Item>
              <Descriptions.Item label={<Icon type="github" />}><a href="https://github.com/juanjuanya" target="blank">juanjuanya</a></Descriptions.Item>
              {/* <Descriptions.Item label={<Icon type="weibo-circle" />}>经纬贰拾陆</Descriptions.Item> */}
            </Descriptions>
          </div>
          <div className="statistics">
            <Row type="flex" gutter={16} justify="space-around" align="middle">
              <Col onClick={() => localStorage.setItem('pathname', 'blog')} span={6}><Link to="blog"><Statistic title="博客" value={blogCount} /></Link></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'diary')} span={6}><Link to="dairy"><Statistic title="日记" value={dailyCount} /></Link></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'footPrint')} span={6}><Link to="footPrint"><Statistic title="足迹" value={footCount} /></Link></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'pictureWall')} span={6}><Link to="pictureWall"><Statistic title="照片" value={photoCount} /></Link></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'message')} span={6}><Link to="message"><Statistic title="留言板" value={0} /></Link></Col>
              <Col span={6}><Statistic title="访问数" value={0} /></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'todos')} span={6}><Link to="todos"><Statistic title="待办事项" value={todoCount} /></Link></Col>
              <Col onClick={() => localStorage.setItem('pathname', 'user')} span={6}><Link to="user"><Statistic title="收藏链接" value={urlCount} /></Link></Col>
              <Col span={12}><Statistic title="博客点赞数" value={0} /></Col>
              <Col span={12}><Statistic title="博客评论数" value={0} /></Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

const User = Form.create({ name: 'register' })(UrlForm);
export default User

const urlClassis: any = {
  0: '经常访问',
  1: '工作需要',
  2: '技术框架',
  3: '数据库',
  4: '日常工具',
  5: '技术库',
  6: '技术文档',
  7: '计算机网络',
  8: '算法学习',
  9: '图片',
  10: 'VPN',
  17: '其他',
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};