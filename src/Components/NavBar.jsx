import React, { useContext } from 'react'
import menu from '../assets/menu.png'
import Upgrade from '../assets/Upgrade.png'
import chatToggle from '../assets/chatToggle.png'
import SideBar from './SideBar'
import { SideBarContext } from './Context'
const NavBar = () => {
   const ContextValue=useContext(SideBarContext)
   
  return (
    <>
    <div className=' w-full h-10 flex justify-between md:justify-end md:gap-60 items-center p-2.5 my-2 sticky top-0 '>
       <div className='flex items-center md:w-full'>
        <img src={menu} alt="image" className='h-6 md:invisible' onClick={()=>ContextValue.setSideBarIsOpen(true)}/>
        <div className='flex text-[#dcdbf6] bg-[#373669] p-1.5 py-1.5 px-2.5 pe-3  w-fit rounded-3xl  f items-center text-[13px] font-medium ms-1 tracking-[.5px]'><img className='h-5 me-1' src={Upgrade} alt="image" />Upgrade to Go</div>
       </div>
       
       <img src={chatToggle} alt="image" className='h-6.5 me-1.5'/>
           <span className='text-white text-[12px] absolute top-10 left-14 opacity-30'>Made by Ahmed Ayyad</span>
    </div>

    <SideBar/>
    </>
  )
}

export default NavBar
