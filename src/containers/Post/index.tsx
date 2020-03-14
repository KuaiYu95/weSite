import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Input, Select, message, notification } from 'antd'
import MdEditor from '../../components/MdEditor/index'
import { addBlog } from '../../api/index';
import './index.less'
interface IProps {
  history: any
}
const { Option } = Select
export default class Post extends Component<IProps> {
  state = {
    blogList: [],
    totalItems: 0,
    currentPage: 1,
    pageSize: 4,
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

  handleSelect = (value: any) => {
    this.setState({ typeIds: value })
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
            this.props.history.push('blog')
          })
        } else {
          message.error('发布失败，请检查网络')
        }
      })
    }
  }

  render() {
    let { text, title, typeIds } = this.state
    return (
      <div className="blog" style={{ padding: 24, overflow: 'auto', margin: 'auto' }}>
          <div className="tab-line" style={{ width: '100%', margin: '0 0 16px' }}>
            <Link to='/blog'><Button type="primary"><Icon type="left" /> 博客列表</Button></Link>
            <Input placeholder="请输入标题" value={title} onChange={this.handleTitle} allowClear />
            <Select placeholder="请对博客分类" mode="multiple" style={{ minWidth: 235 }} value={typeIds} onChange={this.handleSelect} maxTagCount={2} maxTagTextLength={4}>
              {blogType.map((it: any) => {
                return <Option key={it}>{it}</Option>
              })}
            </Select>
            <label htmlFor={"aaaa"}>
              <span className="upload"><Icon type="upload" /> 上传 Markdown 文件</span>
              <input style={{ display: 'none' }} id="aaaa" type="file" onChange={this.getFile} />
            </label>
            <Button onClick={this.onSubmit}>发布</Button>
          </div>
          <div className="write-blog">
            <MdEditor getValue={this.getValue} value={text} />
          </div>
      </div>
    )
  }
}

const blogType = [
  'HTML / CSS', 'JS / TS', 'React及其周边技术栈', '各端小程序开发', '移动端 H5', 'webpack', '其他技术框架', '数据库', '数据结构与算法', '开发工具', '计算机网络', '其他'
]