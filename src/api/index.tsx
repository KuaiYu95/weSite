import ajax from './ajax'
import { message } from 'antd'
let confirm = localStorage.getItem('confirm')
let err = '对不起，您没有权限'
// 获取 首页数据
export const getTotal = (data: object) => ajax('/get-total', 'GET')
// 获取 时间线
export const getTimeline = (data: object) => ajax('/get-timeline', 'GET')
// 添加 时间线
export const addTimeline = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-timeline', 'POST', data)
}
// 获取 todos
export const getTodos = (data: object) => ajax('/get-todos', 'GET')
// 添加 todo
export const addTodos = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-todos', 'POST', data)
}
// 修改 todo
export const modifyTodos = (data: object) => ajax('/modify-todos', 'POST', data)
// 删除 todo
export const delTodos = (data: object) => ajax('/del-todos', 'POST', data)
// 获取 足迹
export const getFootPrint = (data: object) => ajax('/get-foot-print', 'GET')
// 添加 足迹
export const addFootPrint = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-foot-print', 'POST', data)
}
// 获取 日记
export const getDiary = (data: object) => ajax('/get-diary', 'GET')
// 添加 日记
export const addDiary = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-diary', 'POST', data)
}
// 获取 收藏
export const getUrl = (data: object) => ajax('/get-url', 'GET')
// 添加 收藏
export const addUrl = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-url', 'POST', data)
}
// 获取 收藏
export const getBlog = (data: object) => ajax('/get-blog', 'GET', data)
// 添加 blog
export const addBlog = (data: object) => {
  if (confirm !== '0913') {
    message.error(err)
    return
  }
  return ajax('/add-blog', 'POST', data)
}
// 获取 blog详情
export const getBlogDetail = (data: object) => ajax('/get-blog-detail', 'GET', data)
