import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Layout = () => {
  return (
    <main className='flex flex-col h-screen max-w-full relative'>
        <Header />
        <SideBar />
        <Link to={'/add-task'}>
          <Button
          content={<FontAwesomeIcon icon={faPlus} size='lg' color='white' />}
          className='fixed bottom-5 right-5 w-14 h-14 rounded-full p-2 flex items-center justify-center bg-slate-600 hover:bg-slate-700'
          title='Add new task'
          />
        </Link>
        <Outlet className='flex-1' />
        <Footer />
    </main>
  )
}

export default Layout