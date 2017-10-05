import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

// RootView that serves as a container to the whole app structure
class RootView extends Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-expand-xs navbar-dark bg-dark'>
          <Link to='/' className='navbar-brand'>Addresses</Link>
          <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className={'nav-item'}>
              <NavLink to='/' isActive={() => this.props.history.location.pathname === '/'} className='nav-link'>Addresses</NavLink>
            </li>
            <li className={'nav-item'}>
              <NavLink to='/address' className='nav-link'>New Address</NavLink>
            </li>
          </ul>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default RootView
