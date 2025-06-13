import React from 'react'
import Logo from '../Movie-logo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
      <img className= 'w-[60px] ' src={Logo}  alt=''/>
      <Link to='/' className='text-blue-500 text-3xl font-bold'>Movies</Link>
      <Link to='/Watchlist' className='text-blue-500 text-3xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar
