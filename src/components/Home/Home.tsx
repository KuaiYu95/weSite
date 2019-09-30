import React from 'react'
import './Home.less'
import {Button} from 'antd'

function Home() {
  return (
    <div className="bg">
      <div className="title">
        welcome to our site
      </div>
      <div className="block">
        <Button>蒯爸爸</Button>
        <Button>闫狗子</Button>
      </div>
      
    </div>
  )
}

export default Home