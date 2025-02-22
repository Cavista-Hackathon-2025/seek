import { useChatStore } from '@/store/chat.store';
import Image from 'next/image'
import React, { useEffect } from 'react'

const ChatQuestion = ({img, text}: any) => {
  const {userMessage, setUserMessage} = useChatStore()

  useEffect(() => {
    if (userMessage) {
      console.log('Updated userMessage:', userMessage); // This will log the updated state
    }
  }, [userMessage]); 

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setUserMessage(text); // Ensure that `text` is defined in your component
    console.log();
  };
  return (
    <div className=' cursor-pointer hover:bg-color8-200 px-5 py-[10px] border-2 border-primarytext rounded-[40px] flex items-center gap-2 min-w-fit' onClick={handleClick}>
        
        <p className='text-desktop-caption'>{text}</p>
    </div>
  )
}

export default ChatQuestion