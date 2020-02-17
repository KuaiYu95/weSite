import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import { getFootPrint, addFootPrint } from '../../api';
import { Icon, Tag, Button, Input, notification } from 'antd';
import './index.less'

const TextArea: any = Input.TextArea
export default class FootPrint extends Component {

  state = {
    longitude: '120.060141',
    latitude: '30.285995',
    zoom: 0,
    location: '西溪花园 · 芦雪苑',
    title: '我们的家',
    time: new Date().toLocaleDateString().split('/').join('-'),
    addMap: false,
    isCollect: true,
    center: {
      longitude: 120.059063,
      latitude: 30.285201
    },
    useCluster: false,
    markers: []
  }

  componentDidMount() {
    getFootPrint({}).then((res: any) => {
      let { success, data } = res.data
      let { markers } = this.state
      data = data.map((it: any) => {
        let myLabel = <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />
        return { ...it, myLabel }
      })
      success && this.setState({
        markers: markers.concat(data)
      })
    })
  }

  addFootPrint() {
    let { longitude, latitude, location, title, markers } = this.state
    let time = new Date().getTime()
    let position = { longitude, latitude }
    let myLabel = <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />
    let data = { position, location, title, time }
    if (longitude && latitude && location && title) {
      addFootPrint(data).then((res: any) => {
        let { success } = res.data
        success && this.setState({
          addMap: false,
          markers: [...markers, { ...data, myLabel }],
          center: { longitude, latitude },
          isCollect: true,
        })
        this.openNotification(success)
      })
    } else {
      notification['error']({
        message: '操作提示',
        description: '添加失败，有未填写字段',
        duration: 2
      })
    }
  }

  openNotification(success: boolean) {
    success ? notification['success']({
      message: '操作提示',
      description: '添加成功，留下 👣 一串串',
      duration: 2
    }) :  notification['error']({
      message: '操作提示',
      description: '添加失败，请检查网络',
      duration: 2
    })
  };

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
        time: time ? new Date(time).toLocaleDateString().split('/').join('-') : new Date().toLocaleDateString().split('/').join('-'),
        isCollect: true,
        addMap: false
      })
    },
  }

  renderMarkerLayout(extData: any) {
    return <div>{extData.myLabel}</div>
  }

  addMap() {
    this.setState({
      addMap: true,
      title: '',
      location: '',
    })
  }

  save(e: any, type: string) {
    type === 'location' && this.setState({ location: e.target.value })
    type === 'title' && this.setState({ title: e.target.value })
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
          <Map amapkey='ec5816ac0b3be06896d10712b1c815c2' plugins={plugins} center={this.state.center} zoom={15} events={this.events} >
            <Markers markers={this.state.markers} useCluster={this.state.useCluster} render={this.renderMarkerLayout} events={this.markerEvents} />
            <div style={card}>
              {isCollect && <>
                <Tag className='tag' color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="search" /> 时间: {new Date().toLocaleDateString()}</Tag>
                <Tag className='tag' color="#000"><Icon type="environment" /> 地点: {location}</Tag>
                <Tag className='tag wrap' color="#000"><Icon type="menu" /> 描述: {title}</Tag>
              </>}
              {!isCollect && <>
                <Tag className='tag' color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className='tag' color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className='tag' color="#888E9D" onClick={this.addMap.bind(this)}><Icon type="plus-circle" /> 未收藏，去添加收藏</Tag>
              </>}
            </div>
          </Map>
        </div>
        {addMap && <div className="side">
          <div className='row-input'>
            <Icon className='icon' type="compass" />
            <Input className='input' type='text' value={longitude} onChange={(e: any) => this.save(e, 'longitude')} />
          </div>
          <div className='row-input'>
            <Icon className='icon' type="compass" rotate={90} />
            <Input className='input' type='text' value={latitude} onChange={(e: any) => this.save(e, 'latitude')} />
          </div>
          <div className='row-input'>
            <Icon className='icon' type="search" />
            <Input className='input' type='text' value={new Date().toLocaleDateString()} onChange={(e: any) => this.save(e, 'time')} />
          </div>
          <div className='row-input'>
            <Icon className='icon' type="environment" />
            <Input className='input' type='text' placeholder='请输入地址' onChange={(e: any) => this.save(e, 'location')} />
          </div>
          <div className='row-input'>
            <Icon className='icon' type="menu" />
            <TextArea allowclear="true" autosize={{ minRows: 3, maxRows: 5 }} placeholder='请输入标题' onChange={(e: any) => this.save(e, 'title')} />
          </div>
          <div className='form-submit'>
            <Button block type='primary' onClick={this.addFootPrint.bind(this)}>添加</Button>
          </div>
        </div>}
      </>
    )
  }
}
