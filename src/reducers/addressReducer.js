import {
  ACTIONS
} from '../actionTypes'
import update from 'immutability-helper'
const INITIAL_STATE = {
  input: {},
  items: null,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ADDRESSES_SUCESSS:
      return {...state, items: action.payload}
    case ACTIONS.INPUT_CHANGED:
    {
      let obj = {}
      obj[action.payload.prop] = action.payload.value
      return update(state,
        {input: {$merge: obj}}
      )
    }
    case ACTIONS.ADDRESS_SAVE_SUCCESS:
      return {...state, input: {}, error: false, missing: null}
    case ACTIONS.ADDRESS_SAVE_ERROR:
      return {...state, error: true, input: {}}
    case ACTIONS.ADDRESS_MISSING_FIELD:
      return {...state, missing: action.payload}
    case ACTIONS.SET_INPUT:
      return {...state, input: action.payload}
    default:
      return state
  }
}
