import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {


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
console.log("eroro",e.message);

        }
    }
    return (<>
        <div>        
            <label>Name</label>
            <input type='Text' value={name} onChange={(e) => setName(e.target.value)}></input>
            <label>password</label>
            <input type='Text' value={password} onChange={(e) => setPassword(e.target.value)}></input>

        </div>
        <button onClick={() => handleSubmit()}>Submit</button>
    </>
    )
}
  
export default Login        