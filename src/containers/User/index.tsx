import React, { Component } from 'react'
import { Modal, Avatar, Icon, Input, Descriptions, Statistic, Row, Col, message, Form, Select, notification } from 'antd'
import { Link } from 'react-router-dom'
import { getTotal, getUrl, addUrl } from '../../api'
import './index.less'

const { Search } = Input;
const { Option } = Select;
const { Item } = Form
class UrlForm extends Component<any> {
  state = {
    visible: false,
    postCount: 0,
    urlCount: 0,
    articalCount: 0,
    todoCount: 0,
    dailyCount: 0,
    footCount: 0,
    photoCount: 0,
    featCount: 0,
    money: 0,
    urls: [[], [], [], [], [], [], [], [], [], [], []],
    newUrls: [[], [], [], [], [], [], [], [], [], [], []],
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
        let newUrls: any = [[], [], [], [], [], [], [], [], [], [], []]
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
            this.setState({ newUrls, urls: newUrls })
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
      this.setState({newUrls: urls})
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
    const { postCount, todoCount, dailyCount, footCount, photoCount, newUrls, visible, urlCount, title, url } = this.state
    const renderHeader = (
      <div className='avatar-user'>
        <Avatar size="small" src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/5b019b627dcc672321b168667d7337e0-88-88.gif" />
        <span className="username">要什么自行车</span>
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
                <a href={it.url} target="blank">{it.title}</a><span className="int"></span>
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
                      <Option value="0">经常访问</Option>
                      <Option value="1">工作</Option>
                      <Option value="2">HTML & CSS</Option>
                      <Option value="3">JAVASCRIPT</Option>
                      <Option value="4">REACT</Option>
                      <Option value="5">LeedCode</Option>
                      <Option value="6">数据库</Option>
                      <Option value="7">计算机网络</Option>
                      <Option value="8">工具</Option>
                      <Option value="9">图片</Option>
                      <Option value="10">VPS</Option>
                      <Option value="11">其他</Option>
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
          <p className='saohua'>{saohua[(Math.random() * 100 | 0) % 38]}</p>
          {newUrls.map((it: any, idx: number) => {
            if (idx === 0) return null
            return it.length === 0 ? null : <div className='list' key={idx}>
              <h4>{urlClassis[+idx]}</h4>
              <ul>
                {it.map((item: any) => {
                  return <li className="list-item" key={item.time}>
                    <a href={item.url} rel="noopener noreferrer" target='_blank' className='ellipsis'>{item.title}</a>
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
              <Descriptions.Item label={<Icon type="wechat" />}>mywx_ky</Descriptions.Item>
              <Descriptions.Item label={<Icon type="environment" />}>浙江杭州</Descriptions.Item>
              <Descriptions.Item label={<Icon type="github" />}><a href="https://github.com/KuaiYu95" target="blank">KuaiYu95</a></Descriptions.Item>
              <Descriptions.Item label={<Icon type="weibo-circle" />}>经纬贰拾陆</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="statistics">
            <Row type="flex" gutter={16} justify="space-around" align="middle">
              <Col span={6}>
                <Link to='/ky/blog'><Statistic title="博客" value={postCount} /></Link>
              </Col>
              <Col span={6}>
                <Link to='/ky/diary'><Statistic title="日记" value={dailyCount} /></Link>
              </Col>
              <Col span={6}>
                <Link to='/ky/footPrint'><Statistic title="足迹" value={footCount} /></Link>
              </Col>
              <Col span={6}>
                <Link to='/ky/pictureWall'><Statistic title="照片" value={photoCount} /></Link>
              </Col>
              <Col span={6}>
                <Link to='/ky/todos'><Statistic title="待办" value={todoCount} /></Link>
              </Col>
              <Col span={6}>
                <Statistic title="收藏" value={urlCount} />
              </Col>
              <Col span={6}>
                <Statistic title="留言板" value={0} />
              </Col>
              <Col span={6}>
                <Statistic title="访问量" value={0} />
              </Col>
              <Col span={6}>
                <Statistic title="点赞量" value={0} />
              </Col>
              <Col span={6}>
                <Statistic title="评论量" value={0} />
              </Col>
              <Col span={6}>
                <Statistic title="like" value={0} />
              </Col>
              <Col span={6}>
                <Statistic title="mark" value={0} />
              </Col>
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
  1: '工作',
  2: 'HTML & CSS',
  3: 'JAVASCRIPT',
  4: 'REACT',
  5: 'LeedCode',
  6: '数据库',
  7: '计算机网络',
  8: '工具',
  9: '图片',
  10: 'VPS',
  11: '其他',
}
const saohua = [
  '吃到了一颗好吃的糖，想跟你的嘴巴分享',
  '抱歉不如抱我',
  '熬夜所以顺便多想你一会儿',
  '反正咸着也是咸着，不如甜一下',
  '躲得过初一躲不过你',
  '打算搬家，搬到你心里',
  '喜欢你硬起来的样子，也喜欢你软下来的样子',
  '想和你过日复一日的生活',
  '想把你埋进怀里，发芽开花结果',
  '离我远点，不然别怪我黏着你',
  '“别什么都赖在我身上” “那我趴在你身上”',
  '有了我你就不能喜欢其他的猪了',
  '早安是一个下引号，前面的句子是昨天想你睡不着呢，和今天一醒来又想跟你说话啦',
  '“总觉得心里缺点什么” “心眼儿”',
  '百年好合就算了，我们七十年好合就够了',
  '小心翼翼地藏起来时也希望被你揪出来熊抱一顿',
  '坚持很累，不想站在你身边了，想躺在你身边',
  'To do list：1. you',
  '不乖，想被罚，罚睡喜欢的人一万遍',
  '"医生说我有低血糖。" "所以呢？" "你嘴甜，不介意我吻你吧？"',
  '我喜欢你，来自左肩，靠近心脏',
  '别想了，外面的猪都不如我可爱',
  '爱你的人东南西北都顺路，想你的人白天黑夜都不忙',
  '一看到你就牙疼，或许因为你太甜了吧',
  '种一片缘分，结一段生死，守一生爱你',
  '我愿用最初的心，陪你走最远的路',
  '我们在一起，你负责宠爱，我负责可爱',
  '你那么可爱，应该遇到我',
  '一房两人三餐四季就是你了',
  '喜欢一个人的感觉，大概就是听别人讨论爱情，我只想起你',
  '欢迎来到王者荣耀，我还有5秒到达你心上',
  '不想做好人，也不想做坏人，只想做你的心上人',
  '我胆子很小，但什么东西都想试一次，恋爱也是，我也想试一次，就和你',
  '我本来是要行走江湖的，但看见你我觉得可以先停一停',
  '我这个人很难将就，遇到对味的就想占为己用',
  '这一生我只想牵你的手，因为今生有你早已足够',
  '以前喜欢热闹，现在喜欢独处，以后喜欢你吧',
  '我不相信永远的爱，因为我只会一天比一天更爱你'
]
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