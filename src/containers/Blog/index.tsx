import React, { Component } from 'react'

export default class Blog extends Component {
  state = {
    blogList: [
      {
        id: 'woefj34frifji4343145',
        title: '起那段分支',
        summary: 'loram sdlafs vndfjnv',
        content: 'sdvslkvnkanvjnvjdfknavjfnvjadnvba;fndjfknvjkdnvjfndjanvjdfnvjdfnjvndfjknvjkdfnvnkdfnj',
        likeCount: 244,
        starCount: 1,
        commentCount: 10,
        tags: ['as', '摩萨'],
        timestamp: '128519574135319'
      }
    ],
    totalNum: 0,
    currentPage: 1,
    pageSize: 10,
  }

  componentDidMount() {

  }

  render() {
    let {blogList} = this.state
    return (
      <div>
        {blogList.map(item => {
          return <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.summary}</div>
            <div>{item.content}</div>
            <div>{item.timestamp}</div>
            <div>{item.tags.map(it => {
              return <span>it</span>
            })}</div>
            <div>{item.likeCount} {item.starCount} {item.commentCount}</div>
          </div>
        })}
      </div>
    )
  }
}