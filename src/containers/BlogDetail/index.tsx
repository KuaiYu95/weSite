import React, { Component } from 'react'
import { message } from 'antd'
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../../components/CodeBlock/index';
import { getBlogDetail } from '../../api/index';
import './index.less'

export default class BlogDetail extends Component {
  state = {
    blogList: [],
    text: '',
    title: '',
    html: '',
    typeIds: [],
  }

  componentDidMount() {
    let href = window.location.href.split('id=')[1]
    href && this.handleViewBlog(href)
  }

  handleViewBlog = (_id: string) => {
    let _this = this
    getBlogDetail({ _id }).then((res: any) => {
      let { success, data } = res.data
      let { title, _id, html, text } = data
      if (success) {
        _this.setState({ title, _id, html, text, isView: true })
      } else {
        message.error('访问接口失败，请检查网络')
      }
    })
  }

  render() {
    let { text, title } = this.state
    return (
      <div className="blog" style={{ padding: 0, overflow: 'auto', margin: 'auto' }}>
        <div className="blog-cont">
          <div className="info">
            <div>{title}</div>
          </div>
          <div className="markd">
            <ReactMarkdown
              className="markdown-body"
              source={text}
              escapeHtml={false}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </div>
      </div>
    )
  }
}