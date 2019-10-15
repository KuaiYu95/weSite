import ajax from './ajax'
// 获取时间线
export const getTimeline = (data:object) => ajax('/get-timeline', 'GET')
// 添加时间线
export const addTimeline = (data:object) => ajax('/add-timeline', 'POST', data)
// 获取 todos
export const getTodos = (data:object) => ajax('/get-todos', 'GET')
// 添加 todos
export const addTodos = (data:object) => ajax('/add-todos', 'POST', data)