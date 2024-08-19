import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
function Layout() {
  return (
    <div>
       <Header/>
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default Layout