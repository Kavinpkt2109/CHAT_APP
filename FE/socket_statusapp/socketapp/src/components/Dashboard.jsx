import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'




const Dashboard = () => {
    const [data, setData] = useState([])
    const state=useLocation()
    const socket = io('http://localhost:8080')
console.log("state",state);

    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected to server");
            socket.emit('getData')
        })
        socket.on('allDetails', (value) => {
            console.log("data from bee", value);

            setData(value)
        })
      

        const handleBeforeUnload = () => {
            socket.emit('disconnectingOne', state.state.name); // Send the name before disconnecting
        };
    
        // Add event listener for when the page is about to unload (e.g., tab close)
        window.addEventListener('beforeunload', handleBeforeUnload);
    


    }, [])





    return (<>
        <div>Dashboard</div>
        {data.map((val) => {
    return (
        <ul > {/* Adding a unique key for each list */}
            <li style={{ color: val.active === false ? 'red' : 'green' }}>
                {val.name}
            </li>
        </ul>
    );
})}
        </>
    )
}

export default Dashboard   

