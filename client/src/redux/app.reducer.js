import * as ActionTypes from '../constants'

const initialState = {
  loadings: {
    seo: false,
  },
  errors: {
    seo: null,
  },
}
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEO_INFO_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, seo: true },
        errors: { ...state.errors, seo: null },
      }
    }
    case ActionTypes.SEO_INFO_SUCCESS: {
      const seo = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, seo: false },
        errors: { ...state.errors, seo: null },
      }
    }

    case ActionTypes.SEO_INFO_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, seo: false },
        errors: { ...state.errors, seo: action.payload },
      }
    }
    default:
      return state
  }
}
export default appReducer
