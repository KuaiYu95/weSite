import React, { Component } from 'react'
import { Button, Icon, Tag, Divider, Pagination, Input, Select, message } from 'antd'
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../../components/CodeBlock/index';
import MdEditor from '../../components/MdEditor/index'
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
    text: '',
    title: '',
    html: '',
    typeIds: []
  }

  componentDidMount() {

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

  handleSelect = (value: any) => {
    this.setState({ typeIds: value })
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

  onSubmit = () => {
    let {title, text, html, typeIds} = this.state
    let uploadTime = new Date().getTime()
    let lastModifyTime = uploadTime
    let commentCount = 0, likeCount = 0, collectCount = 0, viewCount = 0
    console.log({title, text, html, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, collectCount, viewCount})
  }

  render() {
    let { blogList, isWrite, text, title } = this.state
    let limitMd: any = {
      name: 'markdown',
      showUploadList: false,
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    return (
      <div className="blog">
        <div className="tab-line">
          <Button type="primary" onClick={this.isWrite}>
            {isWrite && <Icon type="left" />}
            {isWrite ? '博客列表' : '发布博客'}
            {!isWrite && <Icon type="right" />}
          </Button>
          {isWrite && <Input placeholder="请输入标题" value={title} />}
          {!isWrite && <Search placeholder="搜索" onSearch={this.onSearch} />}
          {!isWrite && <Select defaultValue="0" style={{ width: 400 }}>
            <Option value="0">最近更新 </Option>
            <Option value="1">最多评论 </Option>
            <Option value="2">最多点赞 </Option>
            <Option value="3">最多查看 </Option>
            <Option value="4">最多收藏 </Option>
          </Select>}
          {!isWrite && <Select defaultValue='0' style={{ width: 400 }}>
            <Option value="0">HTML</Option>
            <Option value="1">JS</Option>
          </Select>}
          {isWrite && <Select placeholder="请对博客分类" mode="multiple" style={{ width: 400 }} onChange={this.handleSelect}>
            <Option value="0">HTML</Option>
            <Option value="1">JS</Option>
          </Select>}
          <label htmlFor={"aaaa"}>
            <span className="upload"><Icon type="upload" /> 上传 Markdown 文件</span>
            <input style={{display:'none'}} id="aaaa" type="file" onChange={this.getFile} />
          </label>
          {isWrite && <Button onClick={this.onSubmit}>发布</Button>}
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
            <MdEditor getValue={this.getValue} value={text} />
            {/* {!markdown ? <MdEditor getValue={this.getValue} />
              : <ReactMarkdown
                className="markdown-body"
                source={markdown}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
              />} */}
          </div>}
        {!isWrite && <Pagination showQuickJumper onChange={this.onChange} defaultCurrent={3} total={500} />}
      </div>
    )
  }
}
