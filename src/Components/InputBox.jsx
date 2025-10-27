import React, { useContext, useState, useRef, useEffect } from 'react'; 
import { SideBarContext } from './Context';


const InputBox = () => {
  const ContextValue = useContext(SideBarContext);
  const [text, setText] = useState(''); 
  const textareaRef = useRef(null); 

 
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; 
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  }, [text]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
   
    <div className={`w-full mb-5 text-center relative ${ContextValue.sideBarIsOpen ? 'opacity-40' : ''} md:opacity-100 `}>
      

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        rows={1} 
        type="text"
        className='bg-[#303030] w-10/11 h-auto min-h-12 rounded-4xl focus:border-0 focus:outline-none focus:ring-0 text-white ps-13 pe-24 pt-3 resize-none overflow-y-hidden box-border'
        placeholder='Ask anything'
      />

   
     

     
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -4 24 24" strokeWidth="1.6" stroke="currentColor" className="size-9 bg-white rounded-4xl absolute bottom-3 right-7 md:right-12 lg:right-20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v9" />
      </svg>

   
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -5 26 24" strokeWidth="1.5" stroke="currentColor" className="size-9 bg-[#454545] text-white rounded-4xl absolute bottom-3 right-18 md:right-23 lg:right-31">
        <path className='scale-75 scale-y-55' strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>

    
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -4 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 bg-[#454545] text-white rounded-4xl absolute bottom-3 left-7 md:left-10 lg:left-20">
        <path className='scale-65' strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>

    </div>
   );
};

export default InputBox;
