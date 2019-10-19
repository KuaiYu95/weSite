import ajax from './ajax'
// 获取首页数据
export const getTotal = (data:object) => ajax('/get-total', 'GET')
// 获取时间线
export const getTimeline = (data:object) => ajax('/get-timeline', 'GET')
// 添加时间线
export const addTimeline = (data:object) => ajax('/add-timeline', 'POST', data)
// 获取 todos
export const getTodos = (data:object) => ajax('/get-todos', 'GET')
// 添加 todo
export const addTodos = (data:object) => ajax('/add-todos', 'POST', data)
// 修改 todo
export const modifyTodos = (data:object) => ajax('/modify-todos', 'POST', data)
// 删除 todo
export const delTodos = (data:object) => ajax('/del-todos', 'POST', data)