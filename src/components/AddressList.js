import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'

import { ACTIONS } from '../actionTypes'

class AddressList extends Component {
  constructor (props) {
    super(props)
    this.renderAddressList = this.renderAddressList.bind(this)
    this.onSectionClick = this.onSectionClick.bind(this)
  }

  componentDidMount () {
    // dispatch the action that gets the data from the firebaseDB
    this.props.getAddresses()
  }

  // gets the relative date to display on each card when the address was created or updated
  getRelativeDate (date) {
    date = Date.parse(date)
    return moment(date).fromNow()
  }

  // handle the click of the user in each card and navigates to the AddressUpdate component in which is possible to edit the address
  onSectionClick (address) {
    this.props.history.push({
      pathname: `/address/${address.uid}`,
      state: address
    })
  }

  // renders the list of addresses
  renderAddressList () {
    if (this.props.addresses) {
      return this.props.addresses.map(address => {
        return (
          <div onClick={() => this.onSectionClick(address)} className='list-group-item list-group-item-action flex-column align-items-start mt-4'>
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>{address.city}</h5>
              <small>{this.getRelativeDate(address.created_at)}</small>
            </div>
            <p className='mb-1'>{address.street}</p>
            <p className='mb-1'>{address.ward}</p>
            <p className='mb-1'>{address.district}</p>
            <p className='mb-1'>{address.country}</p>
          </div>
        )
      })
    }
  }

  render () {
    return (
      <div className='list-group'>
        {this.renderAddressList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  addresses: _.map(state.address.items, (val, uid) => { return {...val, uid} }) // using lodash to parse the object structure returned from the database to an array structure
})

const mapDispatchToProps = (dispatch) => ({
  getAddresses: () => dispatch({type: ACTIONS.FETCH_ADDRESSES}),
  setAddress: () => dispatch({type: ACTIONS.NEW_ADDRESS}),
  inputChange: (prop, value) => dispatch({type: ACTIONS.INPUT_CHANGED, payload: {prop, value}})
})
export default connect(mapStateToProps, mapDispatchToProps)(AddressList)
