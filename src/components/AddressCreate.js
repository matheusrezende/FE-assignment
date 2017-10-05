import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddressForm from './AddressForm'
import { ACTIONS } from '../actionTypes'

class AddressCreate extends Component {
  render () {
    const { submitAddress, input, getCurrentLocation } = this.props
    return (
      <div className='container'>
        <AddressForm {...this.props} > {/* A copy of the props in this component is passed to the AddressForm */}
          <div className='row justify-content-between'>
            <button className='btn btn-dark mt-3' style={{alignSelf: 'flex-start'}} onClick={() => submitAddress(input)}>Submit</button>
            <button className='btn btn-dark mt-3' onClick={() => getCurrentLocation()}>Get Current Location</button>
          </div>
        </AddressForm>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  input: state.address.input,
  error: state.address.error,
  missing: state.address.missing
})

const mapDispatchToProps = (dispatch) => ({
  submitAddress: (input) => dispatch({type: ACTIONS.NEW_ADDRESS, input}),
  inputChanged: (prop, value) => dispatch({type: ACTIONS.INPUT_CHANGED, payload: {prop, value}}),
  getCurrentLocation: () => dispatch({type: ACTIONS.CREATE_ADDRESS_BY_LOCATION})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressCreate)
