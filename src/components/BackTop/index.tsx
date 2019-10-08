import React, { Component } from 'react'
import { BackTop, Icon } from 'antd'
import './index.less'
export default class PackageBackTop extends Component {
  render() {
    return (
      <BackTop style={{bottom: 200, right: 60}}>
        <div className="contain">
          <div><Icon type="up" /></div>
          <div>回</div>
          <div>到</div>
          <div>顶</div>
          <div>部</div>
        </div>
      </BackTop>
    )
  }
}