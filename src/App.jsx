import { useContext, useEffect, useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import InputBox from './Components/InputBox'
import { SideBarContext } from './Components/Context'
import useLocalStorage from './Components/useLocalStorage'
import useApi from './Components/useAPI'

function App() {
  const ContextValue = useContext(SideBarContext)
  const[RequstState,setRequstState]=useState(false)

  const[chatHistory,setChatHistory]=useLocalStorage('chatHistory',[]);
     const { data, loading, error, sendPrompt } = useApi();
   
  const onSend = async (text) => {
    
    setRequstState(true)
    setChatHistory((prev)=>[...prev,{type:'user',payload:text,id:Date.now()}])
    console.log('loading...')
    
    try {
      const result = await sendPrompt(text);
      console.log("API Response:", result);
      const responseText = result.candidates[0].content.parts[0].text;
       console.log("API Response:", responseText);
     setChatHistory((prev)=>[...prev,{type:'ai',payload:responseText,id:Date.now()}])
    } catch (err) {
      console.error("API Error:", err);
    }

  console.log('done!')
};
console.log(chatHistory)

  return (
    <div
      className={`
        h-screen flex flex-col
        bg-[#212121]
        overflow-x-scroll
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
     
       {RequstState||chatHistory.length > 0?(<div className=' w-full mt-5 h-full '>
         {chatHistory.map((item)=>{
          if(item.type==='user'){
            return <div className='flex justify-between'>
              <span></span>
              <div key={item.id} className="text-white bg-[#303030] py-2 px-5 w-fit text-end rounded-3xl mb-3 ">{item.payload}</div>
            </div>
          }else{
              return <div key={item.id} className=" text-sm text-white mb-2 whitespace-pre-wrap ">{item.payload}</div> 

          }
         })}
        {loading&&<div className='w-3 h-3 bg-white rounded-full loading'></div>}
        {error&&<div className='text-red-900 '>Error:{error}</div>}
          
       </div>):(
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
       )}
    
        <InputBox onSend={onSend} loading={loading} />
      </div>
    </div>
  )
}

export default App
