import ajax from './ajax'

// export const reqIssue = (data:object) => ajax('/issue', data, 'POST')
export const reqTimeline = (data:object) => ajax('/get-timeline', data, 'GET')
export const resTimeline = (data:object) => ajax('/send-timeline', data, 'POST')