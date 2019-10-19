import React from 'react'
import { Timeline, message, Empty, Input, Button, Cascader } from 'antd'
import { getTimeline, addTimeline } from '../../api'
import './index.less'

const {Item} = Timeline

const options = [
  {
    label: <div>
      <div style={{backgroundColor: 'gray', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      构建项目
    </div>,
    value: 'gray',
  }, {
    label: <div>
      <div style={{backgroundColor: 'yellow', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      发表帖子 / 论坛
    </div>,
    value: 'yellow',
  }, {
    label: <div>
    <div style={{backgroundColor: 'green', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
    发表文章 / 博客
  </div>,
    value: 'green',
  }, {
    label: <div>
      <div style={{backgroundColor: 'aqua', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      填写日记
    </div>,
    value: 'aqua',
  }, {
    label: <div>
      <div style={{backgroundColor: 'tan', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      添加足迹
    </div>,
    value: 'tan',
  }, {
    label: <div>
      <div style={{backgroundColor: 'black', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      添加待办事项
    </div>,
    value: 'black',
  }, {
    label: <div>
      <div style={{backgroundColor: 'orange', width: 10, height: 10, display: 'inline-block', marginRight: 5}}></div> 
      上传照片
    </div>,
    value: 'orange',
  }
]

class TimeLine extends React.Component {
  state = {
    timeline: [],
    color: '',
    content: '',
  }
  componentDidMount() {
    this.getData()
  }
  handleInput = (e:any) => {
    this.setState({content: e.target.value})
  }
  handleCascader = (value:any) => {
    this.setState({color: value[0]})
  }
  getData = () => {
    getTimeline({})
    .then((res:any) => {
      if (res.data && res.data.success) {
        this.setState({timeline: res.data.data})
      } else {
        message.error('数据请求失败，请查看网络！')
      }
    })
  }
  submit = () => {
    const {color, content} = this.state
    const time = new Date().toLocaleDateString().split('/').join('-')
    if (content.trim() !== '') {
      addTimeline({time, color, content})
        .then((res:any) => {
          this.setState({
            color: '',
            content: '',
            time: ''
          })
          if ((res.data && !res.data.success) || res.status !== 200) {
            message.error('数据发送失败，请查看网络！')
          }
          if(res.data && res.data.success) {
            this.getData()
          }
        })
    }
  }
  render() {
    const {timeline, color, content} = this.state
    return (
      <>
        <div className="tips">
          <Timeline>
            <Item color="yellow">发表帖子 / 论坛</Item>
            <Item color="green">发表文章 / 博客</Item>
            <Item color="aqua">填写日记</Item>
            <Item color="tan">添加足迹</Item>
            <Item color="black">添加待办事项</Item>
            <Item>上传照片</Item>
            <Item color="gray">构建项目</Item>
          </Timeline>
        </div>
        <div className="write">
          <Input className="input" value={content} onChange={this.handleInput} placeholder="请输入时间线标题" />
          <Cascader className="cascader" value={[color]} options={options} onChange={this.handleCascader} placeholder="选择类型" />
          <Button className="btn" onClick={this.submit}>确定</Button>
        </div>
        <div className="timeline">
          {timeline.length !== 0 ? <Timeline mode="alternate" reverse>
            {
              timeline.map((item:any, idx:number) => {
                return <Item key={idx} color={item.color}><span style={{color: ""}}>{item.time}</span> {item.content}</Item>
              })
            }
          </Timeline> : <Empty />}
        </div>
      </>
    )
  }
}

export default TimeLine