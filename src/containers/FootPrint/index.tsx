import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import { Icon, Tag, Button, Form, Input } from 'antd';
import './index.less'

const TextArea: any = Input.TextArea
export default class FootPrint extends Component {

  state = {
    longitude: '120.059063',
    latitude: '30.285201',
    zoom: 0,
    location: '西溪花园 · 芦雪苑',
    title: '蒯爸爸的家',
    time: new Date().toLocaleDateString(),
    addMap: false,
    isCollect: true,
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
        location: '何母桥村 · 草荡苑',
        time: '2019/06/24',
        title: '小娟娟的家',
      },
      {
        position: { longitude: 120.059063, latitude: 30.285201 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 2,
        location: '西溪花园 · 芦雪苑',
        time: '2019/10/01',
        title: '蒯爸爸的家',
      },
      {
        position: { longitude: 120.063011, latitude: 30.276084 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 3,
        location: '西溪国家湿地公园',
        time: '2019/12/3',
        title: '我们的后花园',
      },
      {
        position: { longitude: 120.146911, latitude: 30.244799 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 4,
        location: '杭州西湖',
        time: '2019/12/3',
        title: '周末游湖',
      },
      {
        position: { longitude: 118.800528, latitude: 32.053303 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 5,
        location: '南京',
        time: '2019/12/3',
        title: '鸭血粉丝汤、南京大排档',
      },
      {
        position: { longitude: 120.085145, latitude: 30.150139 },
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        myIndex: 6,
        location: '之江家园二区',
        time: '2019/12/3',
        title: '我们的起点',
      },
    ]
  }

  events = {
    created: (mapInstance: any) => {
      this.setState({ zoom: mapInstance.getZoom() })
    },
    click: (e: any) => {
      this.setState({
        latitude: e.lnglat.lat,
        longitude: e.lnglat.lng,
        isCollect: false,
      })
    },
  }

  markerEvents = {
    click: (e: any, marker: any) => {
      const extData = marker.getExtData()
      const { location, position, time, title } = extData;
      this.setState({
        latitude: position.latitude,
        longitude: position.longitude,
        location, title,
        time: time ? time : new Date().toLocaleDateString(),
        isCollect: true,
        addMap: false
      })
    },
  }

  renderMarkerLayout(extData: any) {
    return <div>{extData.myLabel}</div>
  }

  addMap = () => {
    this.setState({
      addMap: true
    })
  }

  render() {
    let { longitude, latitude, location, isCollect, addMap, title } = this.state
    let plugins: any = [
      'Scale',
      { name: 'ToolBar' }
    ]
    let card: object = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: 200,
      padding: '15px',
      fontSize: 12,
    }
    return (
      <>
        <div className='map' style={{ width: addMap ? 'calc(100% - 266px)' : '100%' }}>
          <Map amapkey='ec5816ac0b3be06896d10712b1c815c2' plugins={plugins} center={this.state.center} zoom={5} events={this.events} >
            <Markers markers={this.state.markers} useCluster={this.state.useCluster} render={this.renderMarkerLayout} events={this.markerEvents} />
            <div style={card}>
              {isCollect && <>
                <Tag className='tag' color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="search" /> 时间: {new Date().toLocaleDateString()}</Tag>
                <Tag className='tag' color="#000"><Icon type="environment" /> 地点: {location}</Tag>
                <Tag className='tag' color="#000"><Icon type="menu" /> 描述: {title}</Tag>
              </>}
              {!isCollect && <>
                <Tag className='tag' color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className='tag' color="#F45C24" onClick={this.addMap}><Icon type="plus-circle" /> 未收藏，去添加收藏</Tag>
              </>}
            </div>
          </Map>
        </div>
        {addMap && <div className="side">
          <Form >
            <div className='row-input'>
              <Icon className='icon' type="compass" />
              <Input className='input' type='text' value={longitude} />
            </div>
            <div className='row-input'>
              <Icon className='icon' type="compass" rotate={90} />
              <Input className='input' type='text' value={latitude} />
            </div>
            <div className='row-input'>
              <Icon className='icon' type="search" />
              <Input className='input' type='text' value={new Date().toLocaleDateString()} />
            </div>
            <div className='row-input'>
              <Icon className='icon' type="environment" />
              <Input className='input' type='text' placeholder='请输入地址' />
            </div>
            <div className='row-input'>
              <Icon className='icon' type="menu" />
              <TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} placeholder='请输入标题' />
            </div>
            <div className='form-submit'>
              <Button block type='primary'>添加</Button>
            </div>
          </Form>
        </div>}
      </>
    )
  }
}
