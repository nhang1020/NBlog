import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <h1 style={{ fontSize: '72pt' }} className='admin'>ADMIN</h1>
      <NavLink className="nav-link shadow-1 p-3 rounded-pill" to={'/'}>Về trang chủ</NavLink>
    </div>
  )
}

export default Home