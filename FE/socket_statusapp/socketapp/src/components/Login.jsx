import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [isSignUp, setisSignUp] = useState(false)

  const [signInPassword, setSignInPassword] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [emailId, setEmailId] = useState("")
  const [userName, setUserName] = useState("")
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  // let data=[]



  useEffect(() => {
    // Define the async function inside useEffect
    const fetchUsers = async () => {
      const config = {
        url: "http://localhost:8080/getUsers",
        method: "get",
      };

      try {
        console.log("rrrrrrrrrrrrrrrrrr");

        const { data } = await axios(config);
        setdata(data)
        console.log("data from be ", data);
        // Await axios to resolve the promise
      } catch (e) {
        console.log("Error fetching users:", e.message);
      }
    };

    fetchUsers(); // Call the async function
  }, []);




  async function handleSubmit(event) {
    debugger
    try {
      event.preventDefault(); // Prevent default form submission

      if (userName && signUpPassword && emailId) {
        const config = {
          url: "http://localhost:8080/postUser",
          method: "post",
          data: {
            name: userName, mail: emailId, password: signUpPassword
          }

        }
        try {
          const { data } = await axios(config)

          console.log("user inserted", data)
          // navigate("/home", { state: { ...data } });
          navigate('/home', { state: { ...data[0] } })

        }
        catch (e) {
          console.log("errr", e.message);
        }
      }
      else
        alert("please enter all values");

    }
    catch (e) {
      console.log("eroro", e.message);

    }
  }
  function verifySignIn() {
    debugger
    try {
      console.log("verifinggg");
      let userValue
      if (emailId && signInPassword) { userValue = data.find((val) => val.emailid == emailId) }
      else return;
      console.log("userValue", userValue);

      if (!userValue || signInPassword != userValue?.password) {
        alert("Incorrect data")
      }
      else {
        navigate('/home', { state: { ...userValue } })
      }
    }
    catch (e) {
      console.log("error", e);

    }

  }

  return (
    <>
      {!isSignUp ? (
        <div id="signin" className=' items-center justify-center flex my-16'>
          <div className='bg-gray-100  rounded  p-8 w-full max-w-md'>

            <form onSubmit={verifySignIn}>
              <h2 className=' text-center  font-bold text-2xl'>Sign In</h2>
              <label className=' py-3 block text-gray ' htmlFor="name">EmailId</label>
              <input onChange={(e) => setEmailId(e.target.value)} className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={emailId}></input>
              <label className='py-3 block text-gray' >Password</label>
              <input className='focus:outline-none border-solid border-0 w-full p-3 rounded-md block focus-none shadow-md border-none' placeholder="Please enter value" type='Text' value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)}></input>
              <p className='py-4'>New user?  <span htmlFor="signup" onClick={() => setisSignUp(true)} className='text-sky-700 cursor-pointer		'>Sign Up</span></p>
              <div className='flex flex-col items-center'>
                <button className='font-bold text-sm  rounded-lg py-2 px-4 bg-green-500 border-solid-500' onClick={() => verifySignIn}>Submit</button>
              </div>
            </form>

          </div>
        </div>
      ) : (
        <div id="signup" className=' items-center justify-center flex my-16'>
          <div className='bg-gray-100  rounded  p-8 w-full max-w-md'>

            <form onSubmit={handleSubmit} autoComplete="new-password" >
              <h2 className=' text-center  font-bold text-2xl'>Sign Up</h2>
              <label className=' py-3 block text-gray ' htmlFor="name">Name</label>
              <input autoComplete="new-item" className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
              <label className='py-3 block text-gray '>Password</label>
              <input value={signUpPassword} autoComplete="new-item" className='focus:outline-none border-solid border-0 w-full p-3 rounded-md block focus-none shadow-md border-none' placeholder="Please enter value" type='Text' onChange={(e) => setSignUpPassword(e.target.value)}></input>
              <label className=' py-3 block text-gray ' htmlFor="name">Email Id</label>
              <input autoComplete="new-item" className="focus:outline-none shadow-md w-full p-3 border rounded-md block " placeholder="Please enter value" id="name" type='Text' value={emailId} onChange={(e) => setEmailId(e.target.value)}></input>
              <div className='p-8 flex flex-col items-center'>
                <button className='font-bold text-sm  rounded-lg py-2 px-4 bg-green-500 border-solid-500' >Submit</button>
              </div>
            </form>

          </div>
        </div>

      )
      }
    </>)
}


export default Login        