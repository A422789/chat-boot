import React, { useCallback, useContext, useState } from 'react'
import GPT_icon from '../assets/GPT_icon.png'
import { SideBarContext } from './Context'
import newChat from '../assets/newChat.png'
import Search from '../assets/Search.png'
import Library from '../assets/Library.png'
import Projects from '../assets/Projects.png'
import Setting from '../assets/Setting.png'
import Arrow from '../assets/Arrow.png'
import useMediaQuery from './useMediaQuery.jsx'

const SideBar = () => {
  const ContextValue = useContext(SideBarContext)
  const [drobDown, setdrobDown] = useState(true);
  const handleDorbDown = () => {
    if (drobDown) {
      setdrobDown(false)
    } else {
      setdrobDown(true)
    }
  }
  const dummyChatHistory = [

    { id: 1, title: 'How to use React Hooks ' },
    { id: 2, title: 'Best CSS libraries for 2025' },
    { id: 3, title: 'How to use React Hooks ' },
    { id: 4, title: 'Best CSS libraries for 2025' },
    { id: 5, title: 'How to use React Hooks ' },
    { id: 6, title: 'Best CSS libraries for 2025' },

  ];
  const isMediam = useMediaQuery('(min-width: 768px)')

  return (
    <div className={`
      h-screen bg-[#181818] fixed z-10 left-0  
      transform transition-all duration-300 ease-out
      
    
      w-[69%]
      ${ContextValue.sideBarIsOpen ? 'translate-x-0' : '-translate-x-full'}

    
      md:translate-x-0 
      ${ContextValue.sideBarIsOpen ? 'md:w-[20%]' : 'md:w-[5%]'}
    `}>
      <header className='w-full h-15 top-0 flex justify-between items-center p-1 ps-2 pe-4'>
        <img src={GPT_icon} className='h-8 cursor-pointer' onClick={() => ContextValue.setSideBarIsOpen(!ContextValue.sideBarIsOpen)} />
        

        {isMediam && ContextValue.sideBarIsOpen && (
          <button 
            onClick={() => ContextValue.setSideBarIsOpen(false)} 
            className="p-1 rounded-md text-white hover:bg-gray-700"
          >
    
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
         )}

    
        {!isMediam && ContextValue.sideBarIsOpen && (
            <svg
              onClick={() => ContextValue.setSideBarIsOpen(false)}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5" stroke="currentColor"
              className="w-6 h-6 text-white cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
         )}
      </header>
      

      <main className={`
        m-3 overflow-y-scroll max-h-8/10
     
        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
      `}>
        <div className='mb-7'>

          <span className='flex text-white items-center text-[14px] mb-3.5'> <img src={newChat} className='h-7 me-1' />{!ContextValue.sideBarIsOpen ? '' : 'New chat'} </span>
          <span className='flex text-white items-center text-[14px] mb-3.5'> <img src={Search} className='h-6 me-1' /> {!ContextValue.sideBarIsOpen ? '' : 'Search chats'}</span>
          <span className='flex text-white items-center text-[14px] mb-3.5'> <img src={Library} className='h-6 me-1' />{!ContextValue.sideBarIsOpen ? '' : 'Library '}</span>
          <span className='flex text-white items-center text-[14px] mb-3.5'> <img src={Projects} className='h-6 me-1' />{!ContextValue.sideBarIsOpen ? '' : 'Projects'}</span>
        </div>

        {isMediam ? (
          <div className='mt-3 ms-1 pt-2.5'>
            {dummyChatHistory.map((item) => {
              return (
                <span key={item.id} className='flex text-white items-center text-[15px] mb-4 justify-between'>
                  <span className='flex truncate'>
                    {ContextValue.sideBarIsOpen ? item.title : ''}
                  </span>
                  {ContextValue.sideBarIsOpen && <img src={Setting} className='h-4' />}
                </span>
              )
            })}
          </div>
        ) : (
          <>
            <span className='text-[#a5a5a5] text-sm m-1 flex ' onClick={() => handleDorbDown()}>Chats <span className='relative top-[3px]'>{drobDown ? null : <img src={Arrow}></img>}</span></span>
            <div className='mt-3 ms-1 pt-2.5'>
              {drobDown ? (
                dummyChatHistory.map((item) => {
                  return <span key={item.id} className='flex text-white items-center text-[15px] mb-4 justify-between'> <span className='flex'>{item.title} </span><img src={Setting} className='h-4' /></span>
                })
              ) : (null)}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default SideBar
