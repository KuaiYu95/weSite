import React, { Component } from 'react'
import { Button, Icon, Tag, Divider, Pagination, Upload, Input, Select } from 'antd'
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../../components/CodeBlock/index';
import './index.less'
const { Option } = Select
const { Search } = Input;
export default class Blog extends Component {
  state = {
    blogList: [
      {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }, {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: '这是一段摘要',
        content: '这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容这是文本内容',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        viewCount: 22323,
        tags: ['as', '摩萨'],
        timestamp: '1578108013205'
      }
    ],
    totalNum: 0,
    currentPage: 1,
    pageSize: 10,
    isWrite: true,
    markdown: '',
  }

  componentDidMount() {
    // let AppMarkdown = require('./test.md')
    // fetch(AppMarkdown)
    //   .then(res => res.text())
    //   .then(text => this.setState({ markdown: text }));
  }

  isWrite = () => {
    let { isWrite } = this.state
    this.setState({ isWrite: !isWrite })
  }

  onChange = (page: number, pageSize?: number | undefined) => {
    console.log(page, pageSize);
  }

  onSearch = (value: string) => {
    
  }

  render() {
    let { blogList, isWrite, markdown } = this.state
    return (
      <div className="blog">
        <div className="tab-line">
          <Button type="primary" onClick={this.isWrite}>
            {isWrite && <Icon type="left" />}
            {isWrite ? '博客列表' : '发布博客'}
            {!isWrite && <Icon type="right" />}
          </Button>
          {isWrite && <Input placeholder="请输入标题" />}
          {!isWrite && <Search placeholder="搜索" onSearch={this.onSearch} />}
          {!isWrite && <Select defaultValue="0">
            <Option value="0">最近更新 </Option>
            <Option value="1">最多评论 </Option>
            <Option value="2">最多点赞 </Option>
            <Option value="3">最多查看 </Option>
            <Option value="4">最多收藏 </Option>
          </Select>}
          <Select defaultValue='0' style={{ width: 400 }}>
            <Option value="0">HTML</Option>
            <Option value="1">JS</Option>
          </Select>
          <Upload showUploadList={false}>
            <Button><Icon type="upload" />上传 Markdown 文件</Button>
          </Upload>
        </div>
        {!isWrite ? blogList.map(item => {
          let day = new Date(+item.timestamp).toLocaleDateString().split('/')
          let time = day[0] + '年' + day[1] + '月' + day[2] + '日' + new Date(+item.timestamp).toLocaleTimeString().slice(2)
          return <div className="blog-contain" key={item.id}>
            <div className="blog-header">
              <div className="blog-title"><Icon type="medium" /> {item.title}</div>
              <div className="blog-tags">{item.tags.map((it, index) => {
                return <span className="blog-tags-item" key={index}><Tag color="#637C8F">{it}</Tag></span>
              })}</div>
            </div>
            <div className="blog-summary ellipsis">* {item.summary}</div>
            <div className="blog-content">{item.content}</div>
            <div className="blog-footer">
              <div className="blog-statistic">
                <span>
                  <Icon type="like" />
                  <span className="count">{item.likeCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="star" />
                  <span className="count">{item.starCount}</span>
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
                  <Icon type="clock-circle" /> {time}
                </Tag>
              </div>
            </div>
          </div>
        }) : <div className="write-blog">
            <ReactMarkdown
              className="markdown-body"
              source={markdown}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
              }}
            />
          </div>}
        {!isWrite && <Pagination showQuickJumper onChange={this.onChange} defaultCurrent={3} total={500} />}
      </div>
    )
  }
}
