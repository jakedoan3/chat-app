import React, { useContext } from 'react'
import { BsFillTelephoneFill, BsPersonFillAdd } from 'react-icons/bs'
import { MdMoreHoriz } from 'react-icons/md'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          {/* React Icons for Phone, Add Friend, and "More" ellipsis */}
          <span><BsFillTelephoneFill /></span>
          <span><BsPersonFillAdd /></span>
          <span><MdMoreHoriz /></span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat