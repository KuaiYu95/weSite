import React from 'react'
import { Carousel, Descriptions, Icon, Statistic, Row, Col, message } from 'antd'
import { getTotal } from '../../api'
import p1 from '../../asserts/images/5.jpg'
import p2 from '../../asserts/images/4.jpg'
import p3 from '../../asserts/images/3.jpg'
import p4 from '../../asserts/images/1.jpg'
import p5 from '../../asserts/images/2.jpg'
import wxfkm from '../../asserts/money/wx.jpg'
import zfbfkm from '../../asserts/money/zfb.jpg'
import './index.less'

class User extends React.Component {
  state = {
    postCount: 0,
    articalCount: 0,
    todoCount: 0,
    dailyCount: 0,
    footCount: 0,
    photoCount: 0,
    featCount: 0,
    money: 0,
  }

  componentDidMount() {
    getTotal({}).then((res:any) => {
      if (res.data && res.data.success) {
        this.setState({...res.data.data[0]})
      } else {
        message.error('数据请求失败，请查看网络！')
      }
    })
  }

  render() {
    const {postCount, articalCount, todoCount, dailyCount, footCount, photoCount, featCount, money} = this.state
    console.log({postCount, articalCount, todoCount, dailyCount, footCount, photoCount, featCount, money})
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
              <Statistic title="帖子 / 论坛" value={postCount} suffix=" 篇" />
            </Col>
            <Col span={6}>
              <Statistic title="文章 / 博客" value={articalCount} suffix=" 篇" />
            </Col>
            <Col span={6}>
              <Statistic title="待办事项" value={todoCount} suffix=" 个" />
            </Col>
            <Col span={6}>
              <Statistic title="日记" value={dailyCount} suffix="篇" />
            </Col>
            <Col span={6}>
              <Statistic title="去过的城市" value={footCount} suffix=" 个" />
            </Col>
            <Col span={6}>
              <Statistic title="照片" value={photoCount} suffix=" 张" />
            </Col>
            <Col span={6}>
              <Statistic title="打赏" value={money} suffix=" /rmb" />
            </Col>
            <Col span={6}>
              <Statistic title="痕迹" value={featCount} suffix=" 处" />
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
          <p style={{fontSize: 18, color: '#F45C24', marginLeft: 48, fontFamily: 'cursive'}}>{saohua[(Math.random() * 100 | 0) % 38]} (Tips: 扫码有惊喜哦)</p>
          <span style={{marginLeft: 304, marginRight: 32}}>微信：</span><img style={{width: 100}} src={wxfkm} alt="wxfkm"/>
          <span style={{marginLeft: 64, marginRight: 32}}>支付宝：</span><img style={{width: 100}} src={zfbfkm} alt="zfbfkm"/>
        </div>
      </div>
    )
  }
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

export default User