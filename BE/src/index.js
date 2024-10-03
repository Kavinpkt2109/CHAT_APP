

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const { Pool } = require('pg')
const cors = require('cors')
const pool = new Pool({
    port: 5432,
    database: "Testing",
    user: "postgres",
    password: "Kavi@6103",
    host: "localhost"
})

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
io.on('connection', (socket) => {
    debugger
    console.log("connection established");

    socket.on('getchats', async (id) => {
        try{
        const { rows } = await pool.query(`select * from groups where groupId=$1`, [id])
        let parseMessage = JSON.parse(rows[0].chat)
        parseMessage= parseMessage??[]
        io.emit("chatdetails", { ...rows[0], chat: parseMessage })
        }catch(e){
            console.log("error",e);
            
        }

    })
    socket.on('postMessage', async (data) => {
        console.log("data from FE", data);

        const { rows } = await pool.query(`update groups set chat=$1 where groupId=$2`, [JSON.stringify(data.messages), data.groupId])
        var allData = await pool.query(`select * from groups where groupId=$1`, [data.groupId]);
        let parseMessage = JSON.parse(allData.rows[0].chat)
        io.emit("chatdetails", { ...allData.rows[0], chat: parseMessage })


    })
    socket.on('disconnectingOne', async (name) => {


        console.log("name",name);
        
        await pool.query(`update checkusers set active=false where name=$1`, [name])
        const { rows } = await pool.query(`select * from checkusers`)
        io.emit("allDetails", rows)

    })

})

// io.on('disconnection', (socket) => {
//     console.log("connection stopped");
// })

app.use(express.json())

server.listen(8080, () => console.log("running on port:8080")
)


app.post("/postUser", async (req, res) => {
    debugger
    console.log("req", req.body);



    await pool.query(`insert into checkUsers (name, password, active) values ($1,$2,$3)`, [req.body.name, req.body.password, true])
    res.status(200).send("succes")

})
