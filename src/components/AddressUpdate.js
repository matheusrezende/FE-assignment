import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import AddressForm from './AddressForm'
import { ACTIONS } from '../actionTypes'

class AddressUpdate extends Component {
  componentWillMount () {
    // using lodash to parse the data to the redux store in the input prop, setting all fields in the form
    _.each(this.props.history.location.state, (value, prop) => {
      this.props.inputChanged(prop, value)
    })
  }

  render () {
    const { updateAddress, input, deleteAddress, match } = this.props
    console.log(this.props)
    return (
      <div className='container'>
        <AddressForm {...this.props}> {/* A copy of the props in this component is passed to the AddressForm */}
          <div className='row justify-content-between'>
            <button className='btn btn-dark mt-3' onClick={() => updateAddress(input)}>Submit</button>
            <button className='btn btn-dark mt-3' onClick={() => deleteAddress(match.params.id)}>Delete</button>
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
  updateAddress: (input, uid) => dispatch({type: ACTIONS.UPDATE_ADDRESS, input, uid}),
  deleteAddress: (uid) => dispatch({type: ACTIONS.DELETE_ADDRESS, uid}),
  inputChanged: (prop, value) => dispatch({type: ACTIONS.INPUT_CHANGED, payload: {prop, value}})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate)
