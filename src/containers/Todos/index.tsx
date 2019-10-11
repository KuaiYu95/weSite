import React, {useState,useEffect} from 'react'
import {Input, Button, Icon, Checkbox, message, Empty, Tag} from 'antd';
import moment from 'moment';
import './index.less'

interface ITodo {
	todo: string,
  isChecked: boolean,
  dbc: boolean,
  id: string
}

function Todos() {
  // 暂存输入框内容
  const [todo, setTodo] = useState('')  
  // 所有 Todos 组成的数组
  const [todos, setTodos] = useState<ITodo[]>([ 
    {todo: 'test测试', isChecked: false, dbc: false, id: '1567323296933'},
    {todo: 'blog 添加上次markdown文件件功能添加上次markdown文件功能', isChecked: false, dbc: false, id: '1567323261044'},
    {todo: '替换markdown展示库', isChecked: true, dbc: false, id: '1567323264039'},
  ])  
  // 全选按钮判断
  const [isAllChecked, setIsAllChecked] = useState<boolean>()
  // 判断是否显示清除所有已完成任务按钮
  // const [isHave, setIsHave] = useState<boolean>()
  // 剩余未完成任务
  const [left, setLeft] = useState<number>()
  // 3选1
  const [select, setSelect] = useState('All')

  useEffect(() => {
    const flag = todos.every((it:ITodo) => {
      return it.isChecked === true ? true : false
    })
    flag ? setIsAllChecked(true) : setIsAllChecked(false)

    share(todos)
  }, [todos])

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
    if (todo.trim() === '') {
      message.warn('请输入代办任务')
    } else {
      let id = Date.now().toString()
      setTodo('')
      setTodos([...todos, {todo: todo.trim(), isChecked: false, dbc: false, id}])
    }
  }
  // todo任务是否完成按钮点击
  const handleClickCheck = function(e:any) {
    const id = e.target.id
    const check = e.target.checked
    let datas = [...todos].map((it:ITodo) => {
      if (it.id === id) {
        return {id, isChecked: check, dbc: it.dbc, todo: it.todo}
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
        return {id: it.id, isChecked: !it.isChecked, dbc: it.dbc, todo: it.todo}
      })
      setTodos(datas)
      setIsAllChecked(false)
    } else {
      let datas = [...todos].map((it:ITodo) => {
        if (!it.isChecked) {
          return {id: it.id, isChecked: !it.isChecked, dbc: it.dbc, todo: it.todo}
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
      if (it.id === id) {
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
    const bg:string[] = ['magenta', 'red', 'volcano', 'orange', 'gold',  'green', 'cyan', 'blue', 'geekblue', 'purple']
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
          let a:any = bg[Math.random() * 10 | 0]
          return (
            <div className="item" key={it.id}>
              <Checkbox style={{float: 'left'}} id={it.id} checked={it.isChecked} onClick={handleClickCheck} />
              <div className="block">
                <Tag color={a}>
                  <div className="todo" style={it.isChecked ? {textDecoration: 'line-through'} : {}}>
                    {idx + 1 + '. ' + it.todo}
                  </div>
                </Tag>
                <div className="time">{moment(+it.id).format('L')}</div>
              </div>
              <div style={{float: 'right'}} data-id={it.id} onClick={handleClickDel}>
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