import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
const Chat = () => {
  const location = useLocation()
  const { state } = location;

  const [userMessage, setUserMessage] = useState({ name: state.name, message: "" })
  const [messages, setmessages] = useState([])
  console.log('state in chat', state
  );
  var socket = ""
  const socketRef = useRef(null)

  function makeConnecttion() {
    socketRef.current = io('http://localhost:8080')

    socketRef.current.on('connect', () => {
      console.log("connected");

    })
  }
  useEffect(() => {
    try {
      makeConnecttion()
      debugger
      socketRef.current.emit("getchats", state?.groupid)
      socketRef.current.on("chatdetails", (data) => {
        console.log("data from socketRef.current", data, "DDDDD", typeof (data));

        if (state.groupid == data.groupid) {
          console.log("same chat")

          if (Array.isArray(data.chat)) {
            console.log("it is array");
            setmessages([...data.chat]);
          } else {
            console.error("data.chat is not an array", data.chat);
            setmessages([]);
          }
        }


      })
      return () => {

      }
    }
    catch (e) {
      console.log("error in effect", e);


    }
  }, [])
  function handleSendMessage(id) {
    debugger
    console.log('userMessage', userMessage);
    let data = { groupId: state.groupid, messages: [...messages, userMessage] }
    socketRef.current.emit("postMessage", data)
    setUserMessage({ name: state.name, message: "" })


  }





  return (
    <div className='m-10 flex-col items-center'>
      <div className='w-full h-10 rounded-md p-2 bg-gray-200'>
        <h1 className='font-bold'>Chat-&gt;{ }</h1>
      </div>

      <div id="chatcomp" className='flex flex-col items-center mt-8 w-full'>
        {/* Messages Header */}
        <div className='bg-sky-100 p-4 w-full rounded-md max-w-md'>
          <p className='font-bold'>Messages</p>
        </div>

        <div className='bg-gray-100 p-4 h-96 w-full max-w-md flex flex-col justify-between'>
          <div className='flex-1 overflow-y-auto'>

            {messages.length && messages.map((message, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{message?.name ?? "unknown"}</p>
                <p>{message?.message ?? "null"}</p>
              </div>
            ))}
          </div>

          <div className='p-4 border-t flex space-x-2'>
            <input
              type='text'
              className='flex-grow p-2 border  rounded'
              placeholder='Type a message...'
              onChange={(e) => setUserMessage({ ...userMessage, message: e.target.value })}
            />
            <button onClick={() => handleSendMessage()} className='bg-sky-500 text-white p-2 rounded'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Chat