import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import { Button, Alert, Icon, Tag } from 'antd';
import './index.less'

const card: object = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  maxWidth: 200,
  padding: '15px',
  border: '1px solid #d3d3d3',
  color: '#fff',
  backgroundColor: '#000'
}

export default class FootPrint extends Component {

  state = {
    longitude: '120.059063',
    latitude: '30.285201',
    location: '西溪花园 · 芦雪苑',
    center: {
      longitude: 120.059063,
      latitude: 30.285201
    },
    useCluster: false,
    markers: [
      {
        position: { longitude: 120.02178, latitude: 30.271891 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 1,
      },
      {
        position: { longitude: 120.059063, latitude: 30.285201 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 2,
      }
    ]
  }

  events = {
    click: (e: any, marker:any) => {
      this.setState({
        latitude: e.lnglat.lat,
        longitude: e.lnglat.lng
      })
      const extData = marker.getExtData()
      console.log(extData)
      const index = extData.myIndex;
      alert(`点击的是第${index}号坐标点`);
    }
  }

  renderMarkerLayout(extData: any) {
    return <div>{extData.myLabel}</div>
  }


  render() {
    let { longitude, latitude, location } = this.state
    let plugins: any = [
      'Scale',
      { name: 'ToolBar' }
    ]
    return (
      <>
        <div className='map'>
          <Map amapkey='ec5816ac0b3be06896d10712b1c815c2' plugins={plugins} center={this.state.center} zoom={13} events={this.events}>
            <Markers markers={this.state.markers} useCluster={this.state.useCluster} render={this.renderMarkerLayout} />
            <div className="customLayer" style={card}>
              <p>三方打干二娃个人过为</p>
              <p>{new Date().toLocaleDateString()}</p>
              <Button onClick={() => { alert('You Clicked!') }}>An Ant Design Button</Button>
            </div>
          </Map>
        </div>
        <div className="display">
          <Tag style={{marginBottom: 5}} color="#f50"><Icon type="environment" /> 经度: {longitude}</Tag>
          <Tag style={{marginBottom: 5}} color="#f50"><Icon type="environment" /> 纬度: {latitude}</Tag>
          <Tag style={{marginBottom: 5}} color="#f50"><Icon type="compass" /> 地点: {location}</Tag>
        </div>
      </>
    )
  }
}
