import React from 'react'
import { Timeline } from 'antd'
import './index.less'

const {Item} = Timeline

class TimeLine extends React.Component {

  render() {
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
        <div id="timeline">
          <Timeline mode="alternate" reverse>
            <Item color="gray"><span style={{color: ""}}>2019-09-30</span> 此网站开始搭建，完成首页</Item>
            <Item color="gray"><span style={{color: ""}}>2019-10-08</span> 完成我的主页</Item>
          </Timeline>
        </div>
      </>
    )
  }
}

export default TimeLine