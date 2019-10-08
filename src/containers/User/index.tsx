import React from 'react'
import { Carousel, Descriptions, Icon, Statistic, Row, Col } from 'antd'
import p1 from '../../asserts/pictures/5.jpeg'
import p2 from '../../asserts/pictures/6.jpeg'
import p3 from '../../asserts/pictures/7.jpeg'
import p4 from '../../asserts/pictures/1.jpeg'
import p5 from '../../asserts/pictures/we.jpeg'
import wxfkm from '../../asserts/money/wx.jpg'
import zfbfkm from '../../asserts/money/zfb.jpg'
import './index.less'

class User extends React.Component {

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div className="picture_wall">
          <Carousel className="divImg" autoplay effect="fade">
            <div><img src={p1} alt="p1"/></div>
            <div><img src={p2} alt="p2"/></div>
            <div><img src={p3} alt="p3"/></div>
            <div><img src={p4} alt="p4"/></div>
            <div><img src={p5} alt="p5"/></div>
          </Carousel>
        </div>
        <div className="test1">
          <Row style={{height: 350}} type="flex" gutter={16} justify="space-around" align="middle">
            <Col span={6}>
              <Statistic title="帖子 / 论坛" value={24} suffix=" 篇" />
            </Col>
            <Col span={6}>
              <Statistic title="文章 / 博客" value={65} suffix=" 篇" />
            </Col>
            <Col span={6}>
              <Statistic title="待办事项" value={12} suffix=" 个" />
            </Col>
            <Col span={6}>
              <Statistic title="日记" value={434} suffix="篇" />
            </Col>
            <Col span={6}>
              <Statistic title="去过的城市" value={23} suffix=" 个" />
            </Col>
            <Col span={6}>
              <Statistic title="照片" value={4382} suffix=" 张" />
            </Col>
            <Col span={6}>
              <Statistic title="打赏" value={24.10} suffix=" /rmb" />
            </Col>
          </Row>
        </div>
        <div className="personal">
          <Descriptions title="个人信息" column={2}>
            <Descriptions.Item label={<Icon type="wechat" />}>mywx_ky</Descriptions.Item>
            <Descriptions.Item label={<Icon type="environment" />}>浙江杭州</Descriptions.Item>
            <Descriptions.Item label={<Icon type="github" />}><a href="https://github.com/KuaiYu95" target="blank">KuaiYu95</a></Descriptions.Item>
            <Descriptions.Item label={<Icon type="weibo-circle" />}>经纬贰拾陆</Descriptions.Item>
          </Descriptions>
        </div>
        <div className="test2">
          <p style={{fontSize: 16, color: '#F45C24', marginLeft: 48}}>有钱的捧个钱场，没钱的捧个气场，嘿嘿 😁</p>
          <span style={{marginLeft: 304, marginRight: 32}}>微信：</span><img style={{width: 100}} src={wxfkm} alt="wxfkm"/>
          <span style={{marginLeft: 64, marginRight: 32}}>支付宝：</span><img style={{width: 100}} src={zfbfkm} alt="zfbfkm"/>
        </div>
      </div>
    )
  }
}

export default User