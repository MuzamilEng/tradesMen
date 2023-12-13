import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import Navbar from '../Component/Navbar'

const Layout = ({ children }) => {
  return (
    <main className='w-full bg-white'>
      {/* <Header /> */}
      <Navbar />
      <section className='w-full h-full'>{children}</section>
      <Footer />
    </main>
  )
}

export default Layout
