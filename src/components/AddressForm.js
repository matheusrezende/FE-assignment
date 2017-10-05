import React, { Component } from 'react'

// Address form which will be used to both updating an address or creating a new one
// Every prop is passed by the containers

class AddressForm extends Component {
  renderErrorMessage () {
    if (this.props.error) {
      return (
        <div className='alert alert-danger' role='alert'>
          <strong>Something went wrong, please try again.</strong>
        </div>
      )
    }
  }

  renderMissingFieldMessage () {
    if (this.props.missing) {
      return (
        <div className='alert alert-warning' role='alert'>
          <strong>{this.props.missing}</strong>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card' style={{padding: 20}}>
            <div className='form-group mt-4 row'>
              <label htmlFor='street' className='col-2 col-form-label'>Street</label>
              <div className='col-10'>
                <input className='form-control' value={this.props.input.street} id='street' type='text' onChange={(e) => this.props.inputChanged('street', e.target.value)} />
              </div>
            </div>
            <div className='form-group mt-4 row'>
              <label htmlFor='city' className='col-2 col-form-label'>City</label>
              <div className='col-10'>
                <input className='form-control' value={this.props.input.city} id='city' type='text' onChange={(e) => this.props.inputChanged('city', e.target.value)} />
              </div>
            </div>
            <div className='form-group mt-4 row'>
              <label htmlFor='ward' className='col-2 col-form-label'>Ward</label>
              <div className='col-10'>
                <input className='form-control' value={this.props.input.ward} id='ward' type='text' onChange={(e) => this.props.inputChanged('ward', e.target.value)} />
              </div>
            </div>
            <div className='form-group mt-4 row'>
              <label htmlFor='district' className='col-2 col-form-label'>District</label>
              <div className='col-10'>
                <input className='form-control' value={this.props.input.district} id='district' type='text' onChange={(e) => this.props.inputChanged('district', e.target.value)} />
              </div>
            </div>
            <div>
              {this.renderErrorMessage()}
              {this.renderMissingFieldMessage()}
            </div>
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}

export default AddressForm
