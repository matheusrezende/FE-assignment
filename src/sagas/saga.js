import {
  spawn,
  takeLatest,
  all,
  call,
  put
} from 'redux-saga/effects'
import firebase from 'firebase'
import axios from 'axios'
import { fetch, getCurrentLocation } from './promises'
import { ACTIONS } from '../actionTypes'
import history from '../config/history'
import { GEOCODER_API_KEY } from '../config/apiKeys'

export default function * rootSaga () {
  yield all([
    spawn(FETCH_ADDRESSES),
    spawn(NEW_ADDRESS),
    spawn(CREATE_ADDRESS_BY_LOCATION),
    spawn(DELETE_ADDRESS),
    spawn(UPDATE_ADDRESS)
  ])
}

// this saga fetches all addresses from the firebase database and set it to the address reducer
function * FETCH_ADDRESSES () {
  yield takeLatest(ACTIONS.FETCH_ADDRESSES, function * (action) {
    try {
      const address = yield call(fetch, '/address')
      yield put({type: ACTIONS.FETCH_ADDRESSES_SUCESSS, payload: address.val()})
    } catch (err) {
      yield put({type: ACTIONS.ADDRESS_SAVE_ERROR})
    }
  })
}

// this saga push a new address to the firebase database
function * NEW_ADDRESS () {
  yield takeLatest(ACTIONS.NEW_ADDRESS, function * (action) {
    try {
      if (validateFields(action.input)) {
        yield put({type: ACTIONS.ADDRESS_MISSING_FIELD, payload: validateFields(action.input).message})
        return
      }

      yield firebase.database().ref(`/address`).push({ ...action.input, country: 'Vietnam', created_at: new Date().toString() })
      history.push('/')
      yield put({type: ACTIONS.ADDRESS_SAVE_SUCCESS})
    } catch (err) {
      yield put({type: ACTIONS.ADDRESS_SAVE_ERROR})
    }
  })
}

// this saga updates an address given the uid of said object
function * UPDATE_ADDRESS () {
  yield takeLatest(ACTIONS.UPDATE_ADDRESS, function * (action) {
    try {
      yield firebase.database().ref(`/address/${action.uid}`).set({...action.input, country: 'Vietnam', created_at: new Date().toString()})
      history.push('/')
      yield put({type: ACTIONS.ADDRESS_SAVE_SUCCESS})
    } catch (err) {
      yield put({type: ACTIONS.ADDRESS_SAVE_ERROR})
    }
  })
}

function * DELETE_ADDRESS () {
  yield takeLatest(ACTIONS.DELETE_ADDRESS, function * (action) {
    try {
      yield firebase.database().ref(`/address/${action.uid}`).remove()
      history.push('/')
      yield put({type: ACTIONS.ADDRESS_SAVE_SUCCESS})
    } catch (err) {
      console.log(err)
      yield put({type: ACTIONS.ADDRESS_SAVE_ERROR})
    }
  })
}

function * CREATE_ADDRESS_BY_LOCATION () {
  yield takeLatest(ACTIONS.CREATE_ADDRESS_BY_LOCATION, function * (action) {
    try {
      const location = yield getCurrentLocation()
      const decoded = yield axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=street_address&key=${GEOCODER_API_KEY}`)
      const arrayAddress = decoded.data.results[0].formatted_address.split(',')
      const input = {
        street: arrayAddress[0],
        ward: arrayAddress[1],
        district: arrayAddress[2],
        city: arrayAddress[3]
      }
      yield put({type: ACTIONS.SET_INPUT, payload: input})
    } catch (err) {
      yield put({type: ACTIONS.ADDRESS_SAVE_ERROR})
    }
  })
}

function validateFields (input) {
  // street always required
  if (!input.street || input.street.length < 1) {
    return {missing: true, message: 'Street is required'}
  }

  // if city not present ward and district are required
  if (!input.city || input.city.length < 1) {
    if (input.ward === undefined || input.district === undefined) {
      return {missing: true, message: 'Ward, District or City are required'}
    }
  }
  return null
}
