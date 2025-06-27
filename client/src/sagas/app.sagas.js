import { takeEvery, call, put, all } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import * as ActionTypes from '../constants'

export function* seoInfo(action) {
  try {
    const response = yield call(api.seoInfo, action.payload)
    if (response) {
      yield put(actions.seoInfoSuccess(response))
    }
  } catch (error) {
    yield put(actions.seoInfoError(error))
  }
}

export default function* appSagas() {
  yield all([
    //
    takeEvery(ActionTypes.SEO_INFO_REQUEST, seoInfo),
    //
  ])
}
