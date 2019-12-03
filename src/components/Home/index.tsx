import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

function Home() {
  return (
    <div className="bg">
      <div className="title">
        weSite
      </div>
      <div className="block">
        <Button><Link to="/ky">蒯爸爸</Link></Button>
        <Button><Link to="/Yyj">刘亦菲脑残粉</Link></Button>
      </div>

    </div>
  )
}

export default Home