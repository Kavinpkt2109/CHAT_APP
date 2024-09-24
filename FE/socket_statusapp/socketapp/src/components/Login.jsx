import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [isSignUp, setisSignUp] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleSubmit() {
    try {
      const config = {
        url: "http://localhost:8080/postUser",
        method: "post",
        data: {
          name, password
        }

      }
      if (name && password) {
        debugger
        axios(config).then((data) => {
          console.log("user inserted")
          navigate("/dashboard", { state: { name: name } });

        }).catch((e) => {
          console.log("errr", e.message);


        })






      }
    }
    catch (e) {
      console.log("eroro", e.message);

    }
  }
  return (
    <>
      {!isSignUp ? (
        <div id="signin" className=' items-center justify-center flex my-16'>
          <div className='bg-gray-100  rounded  p-8 w-full max-w-md'>

            <form >
              <h2 className=' text-center  font-bold text-2xl'>Sign In</h2>
              <label className=' py-3 block text-gray ' htmlFor="name">Name</label>
              <input className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={name} onChange={(e) => setName(e.target.value)}></input>
              <label className='py-3 block text-gray '>Password</label>
              <input className='focus:outline-none border-solid border-0 w-full p-3 rounded-md block focus-none shadow-md border-none' placeholder="Please enter value" type='Text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <p className='py-4'>New user?  <span htmlFor="signup" onClick={() => setisSignUp(true)} className='text-sky-700 cursor-pointer		'>Sign Up</span></p>
              <div className='flex flex-col items-center'>
                <button className='font-bold text-sm  rounded-lg py-2 px-4 bg-green-500 border-solid-500' onClick={() => handleSubmit()}>Submit</button>
              </div>
            </form>

          </div>
        </div>
      ) : (
        <div id="signup" className=' items-center justify-center flex my-16'>
          <div className='bg-gray-100  rounded  p-8 w-full max-w-md'>

            <form autoComplete="new-password" >
              <h2 className=' text-center  font-bold text-2xl'>Sign Up</h2>
              <label className=' py-3 block text-gray ' htmlFor="name">Name</label>
              <input autocomplete="new-item" className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={name} onChange={(e) => setName(e.target.value)}></input>
              <label className='py-3 block text-gray '>Password</label>
              <input value="" autoComplete="new-item" className='focus:outline-none border-solid border-0 w-full p-3 rounded-md block focus-none shadow-md border-none' placeholder="Please enter value" type='Text'  onChange={(e) => setPassword(e.target.value)}></input>
              <label className=' py-3 block text-gray ' htmlFor="name">Email Id</label>
              <input autocomplete="new-item" className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={name} onChange={(e) => setName(e.target.value)}></input>
                            <div className='p-8 flex flex-col items-center'>
                <button className='font-bold text-sm  rounded-lg py-2 px-4 bg-green-500 border-solid-500' onClick={() => handleSubmit()}>Submit</button>
              </div>
            </form>

          </div>
        </div>

      )
      }
    </>)
}


export default Login        