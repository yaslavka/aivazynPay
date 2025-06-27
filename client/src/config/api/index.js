import axios from 'axios'
import Raven from 'raven-js'
import { getAccessToken } from '../../utils'
export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const baseInstanceAv = axios.create({
  baseURL: process.env.REACT_APP_AVITO_BASE_URL,
})

baseInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Raven.captureException(error)
    return Promise.reject(error)
  },
)
baseInstance.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    Raven.captureException(error)
    if (error?.response?.status === 401) {
      localStorage.clear()
      localStorage.removeItem('persist:root')
      localStorage.removeItem('access_token')
      throw new Error(error?.response?.data?.message)
    } else if (error?.response) {
      throw new Error(error?.response?.data?.message)
    } else {
      throw new Error(error?.message)
    }
  },
)

baseInstanceAv.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    Raven.captureException(error)
    if (error?.response) {
      throw new Error(error?.response?.data?.message)
    } else {
      throw new Error(error?.message)
    }
  },
)
