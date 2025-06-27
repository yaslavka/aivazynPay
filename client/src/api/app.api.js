import { baseInstance } from '../config/api'

export const seoInfo = (data) => {
  return baseInstance.post('/rest/inner/notify', data)
}
