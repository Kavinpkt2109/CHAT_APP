

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

    socket.on('getData', async () => {
        const { rows } = await pool.query(`select * from checkusers`)
        io.emit("allDetails", rows)

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
