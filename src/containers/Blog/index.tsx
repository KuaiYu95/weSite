import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tag, Divider, Pagination, Input, Select, message, Empty } from 'antd'
import moment from 'moment';
import { getBlog } from '../../api/index';
import './index.less'

const { Option } = Select
const { Search } = Input;
export default class Blog extends Component {
  state = {
    blogList: [],
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    searchSort: '0',
    searchType: '',
    searchValue: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let { currentPage, pageSize, searchSort, searchValue, searchType } = this.state
    getBlog({ currentPage, pageSize, searchSort, searchValue, searchType }).then((res: any) => {
      let { success, data, totalItems } = res.data
      if (success) {
        this.setState({ blogList: data, totalItems })
      } else {
        message.error('访问接口失败，请检查网络')
      }
    })
  }

  onChange = (page: number, pageSize?: number | undefined) => {
    console.log(page, pageSize)
    this.setState({ currentPage: page, pageSize }, () => {
      this.getData()
    })
  }

  onSearch = (value: string) => {
    this.setState({ searchValue: value }, () => {
      this.getData()
    })
  }

  handleSelectSort = (value: any) => {
    this.setState({ searchType: value }, () => {
      this.getData()
    })
  }

  handleSearchSort = (value: string) => {
    this.setState({ searchSort: value }, () => {
      this.getData()
    })
  }

  render() {
    let { blogList, totalItems, searchSort, searchType, pageSize } = this.state
    return (
      <div className="blog" style={{ padding: 24, overflow: 'auto', margin: 'auto' }}>
        <div className="tab-line" style={{ width: '800px', margin: 'auto'}}>
          <Link to='/post'><Button type="primary">发布博客 <Icon type="right" /></Button></Link>
          <Search placeholder="搜索" onSearch={this.onSearch} />
          <Select defaultValue={searchSort} style={{ width: 400 }} onChange={this.handleSearchSort}>
            <Option value="0">最近更新 </Option>
            <Option value="2">最多点赞 </Option>
            <Option value="4">最多收藏 </Option>
            <Option value="1">最多评论 </Option>
            <Option value="3">最多查看 </Option>
          </Select>
          <Select defaultValue={searchType} style={{ width: 400 }} onChange={this.handleSelectSort}>
            <Option value="">全部 </Option>
            {blogType.map((it: any) => {
              return <Option key={it}>{it}</Option>
            })}
          </Select>
        </div>
        {(blogList.length > 0 ? blogList.map((item: any) => {
          let isUploadTime = item.uploadTime === item.lastModifyTime
          let time = moment(+item.lastModifyTime).format('YYYY-MM-DD kk:mm:ss')
          return <div className="blog-contain" style={{ margin: '16px auto 0' }} key={item._id}>
            <div className="blog-header">
              <Link to={'/blogdetail/id=' + item._id}><div className="blog-title"><Icon type="medium" /> {item.title}</div></Link>
              <div className="blog-tags">{item.typeIds.map((it: string, index: number) => {
                return <span className="blog-tags-item" key={index}><Tag color="#637C8F">{it}</Tag></span>
              })}</div>
            </div>
            <div className="blog-content">{item.text}</div>
            <div className="blog-footer">
              <div className="blog-statistic" onClick={() => message.warning('开发中，尽情期待吧')}>
                <span>
                  <Icon type="like" />
                  <span className="count">{item.likeCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="star" />
                  <span className="count">{item.collectCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="message" />
                  <span className="count">{item.commentCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="eye" />
                  <span className="count">{item.viewCount}</span>
                </span>
              </div>
              <div className="blog-timestamp">
                <Tag color="#f3fcf6" style={{ color: '#888E9D' }}>
                  {isUploadTime ? '发布时间：' : '最后更新时间：'}<Icon type="clock-circle" /> {time}
                </Tag>
              </div>
            </div>
          </div>
        }) : <Empty description="暂无数据" style={{ color: '#fff', marginTop: '20vh' }} />)}
        <Pagination
          showQuickJumper
          pageSize={pageSize}
          onChange={this.onChange}
          defaultCurrent={1}
          total={totalItems}
          showTotal={total => `共计 ${total} 条`}
          style={{ textAlign: 'right', width: 800, color: '#fff', margin: '40px auto' }}
        />
      </div>
    )
  }
}

const blogType = [
  'HTML / CSS', 'JS / TS', 'React及其周边技术栈', '各端小程序开发', '移动端 H5', 'webpack', '其他技术框架', '数据库', '数据结构与算法', '开发工具', '计算机网络', '其他'
]