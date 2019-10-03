import React from 'react'
import {Button} from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

function Home() {
  return (
    <div className="bg">
      <div className="title">
        welcome to our site
      </div>
      <div className="block">
        <Button>
          <Link  to="/ky">蒯爸爸</Link>
        </Button>
        <Button>闫狗子</Button>
      </div>
      
    </div>
  )
}

export default Home