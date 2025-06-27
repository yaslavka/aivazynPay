import * as ActionTypes from '../constants'

export const seoInfo = (values) => ({
  type: ActionTypes.SEO_INFO_REQUEST,
  payload: values,
})
export const seoInfoSuccess = (userInfo) => ({
  type: ActionTypes.SEO_INFO_SUCCESS,
  payload: userInfo,
})
export const seoInfoError = (error) => ({
  type: ActionTypes.SEO_INFO_ERROR,
  payload: error,
})
