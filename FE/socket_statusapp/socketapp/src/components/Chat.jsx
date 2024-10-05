import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const Chat = () => {
  const location = useLocation()
  const { state } = location;
   const [userMessage, setUserMessage] = useState({ name: state.name, message: "" })
  const [messages, setmessages] = useState([])
  console.log('state in chat', state
  );
const navigate=useNavigate()
  const [groupName, setgroupName] = useState('')
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
        setgroupName(data.name)

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


function handleBack() {
  debugger
  navigate('/home',{state:{...state}})
  
}


  return (
    <div className="m-10 flex-col items-center">
      <div className="w-full h-10 rounded-md p-2 bg-gray-200 flex h-auto">
        <span onClick={handleBack}  className="px-2 font-bold text-4xl mx-2 !cursor-pointer hover:bg-gray-500 rounded relative group">
          &larr;
          <span className="absolute top-full cursor-pointer left-4 w-max max-w-xs  -translate-x-1/2 w-48  mb-2 px-2 py-1 text-xs font-semibold text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
           Back to Home page
          </span>
        </span>{" "}
        <span className="font-bold text-sm my-2 place-items-center grid">
          Chat-&gt;{groupName}
        </span>
      </div>

      <div id="chatcomp" className="flex flex-col items-center mt-8 w-full">
        {/* Messages Header */}
        <div className="bg-sky-100 p-4 w-full rounded-md max-w-md">
          <p className="font-bold">Messages</p>
        </div>

        <div className="bg-gray-100 p-4 h-96 w-full max-w-md flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto  justify-end">
            {messages.length?
             messages.map((message, index) => (
                  <div key={index} className="mb-4  ">
                    <div className="block">
                      <p className="font-bold">{message?.name ?? "unknown"}</p>
                    </div>
                    <div>
                      <p className="">{message?.message ?? "null"}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>

          <div className="p-4 border-t flex space-x-2">
            <input
              type="text"
              className="flex-grow p-2  focus:outline  rounded"
              placeholder="Type a message..."
              onChange={(e) =>
                setUserMessage({ ...userMessage, message: e.target.value })
              }
              value={userMessage.message}
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-sky-500 text-white p-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat