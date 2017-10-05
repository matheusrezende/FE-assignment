import keymirror from 'keymirror'

export const ACTIONS = keymirror({
  FETCH_ADDRESSES: null,
  FETCH_ADDRESSES_SUCESSS: null,
  NEW_ADDRESS: null,
  DELETE_ADDRESS: null,
  UPDATE_ADDRESS: null,
  ADDRESS_SAVE_SUCCESS: null,
  INPUT_CHANGED: null,
  ADDRESS_SAVE_ERROR: null,
  ADDRESS_MISSING_FIELD: null,
  CREATE_ADDRESS_BY_LOCATION: null,
  SET_INPUT: null
})
