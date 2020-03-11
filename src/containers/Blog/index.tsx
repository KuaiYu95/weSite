import React, { Component } from 'react'
import { Button, Icon, Tag, Divider, Pagination, Input, Select, message, notification, Empty } from 'antd'
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../../components/CodeBlock/index';
import MdEditor from '../../components/MdEditor/index'
import moment from 'moment';
import { addBlog, getBlog, getBlogDetail } from '../../api/index';
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
    text: '',
    title: '',
    html: '',
    typeIds: [],
    isWrite: false,
    isView: false,
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

  isWrite = () => {
    let { isWrite } = this.state
    this.setState({ isWrite: !isWrite })
  }

  onChange = (page: number, pageSize?: number | undefined) => {
    console.log(page, pageSize);
  }

  onSearch = (value: string) => {
    this.setState({ searchValue: value }, () => {
      this.getData()
    })
  }

  handleSelect = (value: any) => {
    this.setState({ typeIds: value }, () => {
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

  handleTitle = (e: any) => {
    let { value } = e.target
    this.setState({ title: value })
  }

  getValue = (html: string, text: string) => {
    this.setState({ html, text })
  }

  getFile = (event: any) => {
    if (event.target.files.length) {
      let file = event.target.files[0];
      let reader = new FileReader()
      if (/text\/markdown/.test(file.type)) {
        reader.onload = (event: any) => {
          this.setState({
            title: file.name.split('.md')[0],
            text: event.target.result
          })
        }
        reader.readAsText(file);
      } else {
        message.error('仅支持上传 markdown 文件')
      }
    }
  }

  handleViewBlog = (_id: string) => {
    getBlogDetail({ _id }).then((res: any) => {
      let { success, data } = res.data
      let { title, _id, html, text } = data
      if (success) {
        this.setState({ title, _id, html, text, isView: true })
      } else {
        message.error('访问接口失败，请检查网络')
      }
    })
  }

  onSubmit = () => {
    let { title, text, html, typeIds } = this.state
    let uploadTime = new Date().getTime()
    let lastModifyTime = uploadTime
    let commentCount = 0, likeCount = 0, collectCount = 0, viewCount = 0
    if (title.trim() === '') {
      message.warning('请输入标题')
    } else if (typeIds.length === 0) {
      message.warning('请对博客分类')
    } else if (text.trim() === '') {
      message.warning('请输入内容')
    } else {
      addBlog({ title: title.trim(), text, html, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, collectCount, viewCount }).then((res: any) => {
        let { success } = res.data
        if (success) {
          notification['success']({
            message: '操作提示',
            description: `${title}发布成功`,
            duration: 2
          })
          this.setState({ title: '', text: '', typeIds: [], html: '', isWrite: false }, () => {
            this.getData()
          })
        } else {
          message.error('发布失败，请检查网络')
        }
      })
    }
  }

  render() {
    let { blogList, isWrite, text, title, typeIds, totalItems, searchSort, searchType, isView } = this.state
    return (
      <div className="blog" style={{ padding: !isView ? 24 : 0, overflow: isView ? 'auto' : 'hidden', margin: 'auto' }}>
        {!isView ? <>
          <div className="tab-line" style={{ width: isWrite ? '100%' : '800px', margin: !isWrite ? 'auto' : '0 0 16px' }}>
            <Button type="primary" onClick={this.isWrite}>
              {isWrite && <Icon type="left" />}
              {isWrite ? '博客列表' : '发布博客'}
              {!isWrite && <Icon type="right" />}
            </Button>
            {isWrite && <Input placeholder="请输入标题" value={title} onChange={this.handleTitle} allowClear />}
            {!isWrite && <Search placeholder="搜索" onSearch={this.onSearch} />}
            {!isWrite && <Select defaultValue={searchSort} style={{ width: 400 }} onChange={this.handleSearchSort}>
              <Option value="0">最近更新 </Option>
              <Option value="2">最多点赞 </Option>
              <Option value="4">最多收藏 </Option>
              <Option value="1">最多评论 </Option>
              <Option value="3">最多查看 </Option>
            </Select>}
            {!isWrite && <Select defaultValue={searchType} style={{ width: 400 }} onChange={this.handleSelectSort}>
              <Option value="">全部 </Option>
              {blogType.map((it: any) => {
                return <Option key={it}>{it}</Option>
              })}
            </Select>}
            {isWrite && <Select placeholder="请对博客分类" mode="multiple" style={{ minWidth: 235 }} value={typeIds} onChange={this.handleSelect} maxTagCount={2} maxTagTextLength={4}>
              {blogType.map((it: any) => {
                return <Option key={it}>{it}</Option>
              })}
            </Select>}
            {isWrite && <label htmlFor={"aaaa"}>
              <span className="upload"><Icon type="upload" /> 上传 Markdown 文件</span>
              <input style={{ display: 'none' }} id="aaaa" type="file" onChange={this.getFile} />
            </label>}
            {isWrite && <Button onClick={this.onSubmit}>发布</Button>}
          </div>
          {!isWrite && (blogList.length > 0 ? blogList.map((item: any) => {
            let isUploadTime = item.uploadTime === item.lastModifyTime
            let time = moment(+item.lastModifyTime).format('YYYY-MM-DD kk:mm:ss')
            return <div className="blog-contain" style={isWrite ? {} : { margin: '16px auto 0' }} key={item._id}>
              <div className="blog-header">
                <div className="blog-title" onClick={() => this.handleViewBlog(item._id)}><Icon type="medium" /> {item.title}</div>
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
          }) : <Empty description="没有找到您想要到博客" style={{ color: '#fff', marginTop: '10vh', fontSize: 20, lineHeight: '48px' }} />)}
          {isWrite && <div className="write-blog">
            <MdEditor getValue={this.getValue} value={text} />
          </div>}
          {!isWrite && <Pagination
            showQuickJumper
            onChange={this.onChange}
            defaultCurrent={1}
            total={totalItems}
            showTotal={total => `搜索到 ${total} 条`}
            hideOnSinglePage
            style={{ textAlign: 'right', width: 800 }}
          />}
        </> : <div className="blog-cont">
            <div className="info">
              <h1>{title}</h1>
            </div>
            <div className="md">
              <ReactMarkdown
                className="markdown-body"
                source={text}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
              />
            </div>
          </div>}
      </div>
    )
  }
}

const blogType = [
  'HTML / CSS', 'JS / TS', 'React及其周边技术栈', '各端小程序开发', '移动端 H5', 'webpack', '其他技术框架', '数据库', '数据结构与算法', '开发工具', '计算机网络', '其他'
]