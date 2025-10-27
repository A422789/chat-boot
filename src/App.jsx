import { useContext } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import InputBox from './Components/InputBox'
import { SideBarContext } from './Components/Context'

function App() {
  const ContextValue = useContext(SideBarContext)

  return (
    <div
      className={`
        h-screen flex flex-col
        bg-[#212121]
        
        transition-all duration-300 ease-out


       max-w-full
        
        
        ${
          ContextValue.sideBarIsOpen
            ? 'md:ml-[260px] md:w-[calc(100%-260px)  '
            : 'md:ml-[60px] md:w-[calc(100%-60px)]  '
        }
      `}
    >
    
      <NavBar />

     
      <div className='flex-1 w-full flex flex-col justify-center items-center px-4 md:px-8'>
     
        <div
          className={`
            text-white text-3xl md:text-4xl lg:text-5xl
            font-light text-center mb-8

            transition-opacity duration-300
            ${ContextValue.sideBarIsOpen ? 'opacity-40 md:opacity-100' : 'opacity-100'}
          `}
        >
          Where should we begin?
        </div>

        <InputBox />
      </div>
    </div>
  )
}

export default App
