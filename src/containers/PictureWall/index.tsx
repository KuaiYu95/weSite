import React, {Component} from 'react';
import { Card } from 'antd';
import './index.less'

const { Meta } = Card;
export default class PictureWall extends Component {
  walls = [
    {
      photo: [
        'https://kuaiyu95.github.io/pictures/images/2.jpg'
      ],
      time: '',
      view: 0,
      id: '0',
      title: '草荡苑',
      description: '沙雕的周末',
    },
    {
      photo: [
        'https://kuaiyu95.github.io/pictures/images/4.jpg'
      ],
      time: '',
      view: 0,
      id: '1',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://kuaiyu95.github.io/pictures/images/5.jpg'
      ],
      time: '',
      view: 0,
      id: '2',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://kuaiyu95.github.io/pictures/images/1.jpg'
      ],
      time: '',
      view: 0,
      id: '3',
      title: '草荡苑',
      description: '沙雕的周末沙雕的周末沙雕的周末沙雕的周末沙雕的周末',
    },
    {
      photo: [
        'https://kuaiyu95.github.io/pictures/images/3.jpg'
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