import React, {useState,useEffect} from 'react'
import {Input, Button, Icon, Checkbox, message, Empty, Tag} from 'antd';
import {getTodos, addTodos} from '../../api'
import './index.less'

interface ITodo {
	content: string,
  isChecked: boolean,
  _id: string,
  time: string,
}

function Todos() {
  // 所有 Todos 组成的数组
  const [todos, setTodos] = useState<ITodo[]>([])  
  useEffect(() => {
    getData()
  }, [''])
  // 暂存输入框内容
  const [todo, setTodo] = useState('')  
  // 全选按钮判断
  const [isAllChecked, setIsAllChecked] = useState<boolean>()
  // 判断是否显示清除所有已完成任务按钮
  // const [isHave, setIsHave] = useState<boolean>()
  // 剩余未完成任务
  const [left, setLeft] = useState<number>()
  // 3选1
  const [select, setSelect] = useState('All')

  const getData = function() {
    getTodos({}).then((res:any) => {
      if (res.data && res.data.success) {
        setTodos(res.data.data)
        const flag = res.data.data.every((it:ITodo) => {
          return it.isChecked === true ? true : false
        })
        flag ? setIsAllChecked(true) : setIsAllChecked(false)
        share(res.data.data)
      } else {
        message.error('数据请求失败，请查看网络！')
      }
    })
  }

  const share = function(todos:any) {
    // const flag2 = todos.some((it:ITodo) => {
    //   return it.isChecked === true ? true : false
    // })
    // flag2 ? setIsHave(true) : setIsHave(false)

    let left = todos.reduce((count:number, it:ITodo) => {
      if (!it.isChecked) {
        return count = count + 1
      } else {
        return count
      }
    }, 0)
    setLeft(left)
  }

  // 实时更新输入框内容到暂存区
  const handleChangeTodo = function(e:any) {
    setTodo(e.target.value)
  }
  // 添加todo按钮点击操作
  const handleClickAdd = function() {
    let content = todo.trim()
    if (content === '') {
      message.warn('请输入代办任务')
    } else {
      addTodos({content}).then((res:any) => {
        if (res.data && res.data.success) {
          getData()
        } else {
          message.error('数据请求失败，请查看网络！')
        }
      })
      // let id = Date.now().toString()
      // setTodo('')
      // setTodos([...todos, {todo: todo.trim(), isChecked: false, dbc: false, id}])
    }
  }
  // todo任务是否完成按钮点击
  const handleClickCheck = function(e:any) {
    const id = e.target.id
    const check = e.target.checked
    let datas = [...todos].map((it:ITodo) => {
      if (it._id === id) {
        return {...it, isChecked: check}
      } else {
        return it
      }
    })
    setTodos(datas)
  }
  // 全选按钮点击
  const handleClickAllCheck = function() {
    if (isAllChecked) {
      let datas = [...todos].map((it:ITodo) => {
        return {...it, isChecked: !it.isChecked}
      })
      setTodos(datas)
      setIsAllChecked(false)
    } else {
      let datas = [...todos].map((it:ITodo) => {
        if (!it.isChecked) {
          return {...it, isChecked: !it.isChecked}
        } else {
          return it
        }
      })
      setTodos(datas)
      setIsAllChecked(true)
    }
  }
  // todo任务删除按钮
  const handleClickDel = function(e:any) {
    const id = e.target.dataset.id
    let datas = todos.filter((it:ITodo) => {
      if (it._id === id) {
        return false
      } else {
        return true
      }
    })
    setTodos(datas)
  }
  // 清除所有已完成任务按钮点击
  const handleClickCle = function() {
    let datas = todos.filter((it:ITodo) => {
      return it.isChecked ? false : true
    })
    setTodos(datas)
  }
  // 三选一
  const handleClickSelect = function(type:string):void {
    switch(type) {
      case 'All': 
        setSelect('All')
        break
      case 'Active': 
        setSelect('Active')
        break
      case 'Completed':
        setSelect('Completed')
    }
  }
  
  const TodosRender = function(props:any) {
    const {value} = props
    const bg:string[] = ['magenta', 'gold', 'cyan', 'volcano', 'blue', 'geekblue', 'orange', 'red', 'green', 'purple']
    let datas = []
    switch(select) {
      case 'Active': 
        datas = value.filter((it:ITodo) => {
          return it.isChecked ? false : true
        })
        break
      case 'Completed':
        datas = value.filter((it:ITodo) => {
          return it.isChecked ? true : false
        })
        break
      default:
        datas = value
    }
    share(datas)
    return (
      <div className="list">
        {datas.length > 0 ? datas.map((it:ITodo, idx:number) => {
          let a:any = bg[idx % 10]
          return (
            <div className="item" key={it._id}>
              <Checkbox style={{float: 'left'}} id={it._id} checked={it.isChecked} onClick={handleClickCheck} />
              <div className="block">
                <Tag color={a}>
                  <div className="todo" style={it.isChecked ? {textDecoration: 'line-through'} : {}}>
                    {idx + 1 + '. ' + it.content}
                  </div>
                </Tag>
                <div className="time">{it.time}</div>
              </div>
              <div style={{float: 'right'}} data-id={it._id} onClick={handleClickDel}>
                <span style={{pointerEvents: "none", color: 'gray'}}>
                  <Icon type="delete" />
                </span>
              </div>
            </div>
          )
        }) : <Empty />}
      </div>
    )
  }

  return (
    <div className="todos-container">
      <div className="header">
        <Input value={todo} onChange={handleChangeTodo} placeholder="What needs to be done?" />
        <Button className="btn" onClick={handleClickAdd} type="primary">Add</Button>
      </div>
      <div className="center">
        <Checkbox checked={isAllChecked ? true : false} onClick={handleClickAllCheck} /> 
        <span className="ml"> <span className="left">{left}</span> items left</span>
        <div style={select === 'All' ? {color:'#F45C24', boxSizing:'border-box', borderBottom: '3px solid #F45C24', } : {}} 
          onClick={() => handleClickSelect('All')} className="all ml">All</div>
        <div style={select === 'Active' ? {color:'#F45C24', boxSizing:'border-box', borderBottom: '3px solid #F45C24', } : {}} 
          onClick={() => handleClickSelect('Active')} className="active ml">Active</div>
        <div style={select === 'Completed' ? {color:'#F45C24', boxSizing:'border-box', borderBottom: '3px solid #F45C24', } : {}} 
          onClick={() => handleClickSelect('Completed')} className="completed ml">Completed</div>
        <span className="clear ml" onClick={handleClickCle}><Tag color='blue'>Clear Completed</Tag></span>
      </div>
      <TodosRender value={todos} />
    </div>
  )
}

export default Todos