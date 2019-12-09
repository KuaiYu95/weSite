import React, { Component } from 'react'
import { Modal, Button, Icon, Input, Select, DatePicker } from 'antd'
import './index.less'

const { Search } = Input;
const { Option } = Select;
export default class Article extends Component {
  state = {
    visible: false,
    collectList: [
      {
        _id: 12,
        title: '百度',
        url: 'https://www.baidu.com'
      },
      {
        _id: 13,
        title: '百度',
        url: 'https://www.baidu.com'
      },
      {
        _id: 122,
        title: '百度',
        url: 'https://www.baidu.com'
      },
      {
        _id: 124,
        title: '百度',
        url: 'https://www.baidu.com'
      },
      {
        _id: 1112,
        title: '百度',
        url: 'https://www.baidu.com'
      },
    ]
  }

  componentDidMount() {

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onSearch = (value: string) => {
    console.log(value)
  }

  handleChange = (value:any) => {
    console.log(`selected ${value}`);
  }

  onChange = (date:any, dateString:string) => {
    console.log(date, dateString)
  }

  render() {
    let { collectList, visible } = this.state
    return (
      <div className='article-list'>
        <div className='add-bar'>
          <Search
            size='small'
            placeholder="搜索"
            onSearch={this.onSearch}
            style={{ width: '50%' }}
          />
          <Select size='small' defaultValue="lucy" style={{ width: '20%' }} onChange={this.handleChange}>
            <Option value="jack">Jacaffgegrgrqegerqgregreqgerk</Option>
            <Option value="lucy">L收到了女神看到绿女款女哦ucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <DatePicker size='small' style={{ width: '20%' }} onChange={this.onChange} />
          <Button size='small' style={{ width: '7%' }} onClick={this.showModal}><Icon type="plus" /></Button>
          <Modal
            title="添加收藏"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input></Input>
            <Input></Input>
          </Modal>
        </div>
        <div className='visit'>
          <span>经常访问：</span>
          <a href="https://github.com/" target='_blank'>Github</a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
          <a href="" target='_blank'></a>
        </div>
        <div className='list'> 
          <ol>
            {collectList.map((it:any, idx:number) => {
              return <li className="list-item">
                <a href={it.url} target='_blank'>{it.title}</a>
              </li>
            })}
          </ol>
        </div>
      </div>
    )
  }
}