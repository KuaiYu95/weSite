import React, {Component} from 'react';
import { Card } from 'antd';
import './index.less'

const { Meta } = Card;
export default class PictureWall extends Component {
  walls = [
    {
      photo: [
        'http://a1.qpic.cn/psb?/V12emHCJ3kcUUr/9LhjiQ*HsL8sJzduMwRuKngPJUfvYWGawJ2Jl1fh8WY!/c/dGwBAAAAAAAA&ek=1&kp=1&pt=0&bo=PgZUCNALwA8RIGc!&tl=3&vuin=532560194&tm=1575266400&sce=60-2-2&rf=0-0'
      ],
      time: '',
      view: 0,
      id: '0',
      title: '草荡苑',
      description: '沙雕的周末',
    },
    {
      photo: [
        'https://upload-images.jianshu.io/upload_images/15968354-dfb9f08bb6c0bbfc.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp'
      ],
      time: '',
      view: 0,
      id: '1',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://upload-images.jianshu.io/upload_images/15968354-04be903c4542242b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ],
      time: '',
      view: 0,
      id: '2',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://upload-images.jianshu.io/upload_images/15968354-cb2973d9db87137c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ],
      time: '',
      view: 0,
      id: '3',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://upload-images.jianshu.io/upload_images/15968354-6baca8bc98f1e042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ],
      time: '',
      view: 0,
      id: '4',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末沙雕的周末沙雕的周末沙雕的周末沙雕的周末',
    },
  ]

  render() {
    return (
      <div className='picture-wall'>
        {this.walls.map((wall:any) => {
          return (
            <div className='wall' key={wall.id}>
              <Card hoverable style={{ width: 240, height: 353.31 }} cover={<img alt="cover" src={wall.photo[0]} />}>
                <Meta title={wall.title} description={wall.description} />
              </Card>
            </div>
          )
        })}
      </div>
    )
  }
}