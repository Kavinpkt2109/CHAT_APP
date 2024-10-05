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
const [isError,setIsError]=useState('')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        alert("Something went wrong!!")
        console.log("Error fetching users:", e.message);
      }
    };

    fetchUsers(); // Call the async function
  }, []);




  async function handleSubmit(event) {
    debugger;
    try {
      event.preventDefault(); // Prevent default form submission
      if(!emailRegex.test(emailId)){
        setIsError("invalid emailId!! Please enter a valid one!!")
        return
      }
      if (userName && signUpPassword && emailId) {
        let existUserCheck = data.filter((val) => val.emailid == emailId);
        if (existUserCheck[0]?.emailid && existUserCheck[0]?.password) {
          setIsError("user already exist!! Please login");
          return;
        }
        const config = {
          url: "http://localhost:8080/postUser",
          method: "post",
          data: {
            name: userName,
            mail: emailId,
            password: signUpPassword,
          },
        };
        try {
          const { data } = await axios(config);

          console.log("user inserted", data);
          // navigate("/home", { state: { ...data } });
          navigate("/home", { state: { ...data[0] } });
        } catch (e) {
          console.log("errr", e.message);
        }
      } else setIsError("Please fill valid details!!");
    } catch (e) {
      console.log("eroro", e.message);
    }
  }
  function verifySignIn(event) {
    debugger
    try {
      event.preventDefault()
      console.log("verifinggg");

      let userValue
      if (emailId.trim("") != "" && signInPassword.trim("") != "" && emailRegex.test(emailId)) {
        userValue = data.find((val) => val.emailid == emailId);
      } else {
        setIsError("Please fill valid details!!");
        return
      }
      console.log("userValue", userValue);
      if (!userValue) {
        setIsError("User not exist!! Please signup");
        // setisSignUp(true)
        return
      }

      if ( signInPassword != userValue?.password) {
        setIsError("Incorrect password")
        return
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
              <input onChange={(e) => setEmailId(e.target.value)} className={`focus:outline-none ${isError?'border-red-500 border-solid': 'border-solid'} shadow-md w-full p-3 border rounded-md block "`} placeholder="Please enter value" id="name" type='Text' value={emailId}></input>
              <label className='py-3 block text-gray' >Password</label>
              <input className={`focus:outline-none ${isError?'border-red-500': ''} border-solid w-full p-3 rounded-md block focus-none border shadow-md `} placeholder="Please enter value" type='Text' value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)}></input>
              {/* {isError?<div className='mt-2'><span className='text-red-500 '>Please fill valid details!! </span></div>:null} */}
              {isError?<div className='mt-2'><span className='text-red-500 '>{isError} </span></div>:null}

              <p className='py-2'>New user?  <span htmlFor="signup" onClick={() => { setIsError("");setEmailId('');setisSignUp(true)}} className='text-sky-700 cursor-pointer		'>Sign Up</span></p>
              <div className='flex flex-col items-center'>
                <button className='font-bold text-sm  rounded-lg py-2 px-4 bg-green-500 border-solid-500'>Submit</button>
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
              <input autoComplete="new-item" className={`${isError?'border-red-500': ''} focus:outline-none shadow-md w-full p-3 border border-solid rounded-md block `} placeholder="Please enter value" id="name" type='Text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
              <label className='py-3 block text-gray '>Password</label>
              <input value={signUpPassword} autoComplete="new-item" className={`${isError?'border-red-500': ''} focus:outline-none border-solid border w-full p-3 rounded-md block focus-none shadow-md `} placeholder="Please enter value" type='Text' onChange={(e) => setSignUpPassword(e.target.value)}></input>
              <label className=' py-3 block text-gray ' htmlFor="name">Email Id</label>
              <input autoComplete="new-item" className={`${isError?'border-red-500': ''} focus:outline-none shadow-md w-full p-3 border-solid border rounded-md block `} placeholder="Please enter value" id="name" type='Text' value={emailId} onChange={(e) => setEmailId(e.target.value)}></input>
              {isError?<div className='mt-2'><span className='text-red-500 '>{isError} </span></div>:null}

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