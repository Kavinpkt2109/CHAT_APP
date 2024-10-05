
const env=require('dotenv')
env.config();

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const { Pool } = require('pg')
const cors = require('cors')
const pool = new Pool({
    port: process.env.PORT,
    database:  process.env.DATABASE,
    user:  process.env.USER,
    password:  process.env.PASSWORD,
    host: process.env.host
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


        console.log("name", name);

        await pool.query(`update users set active=false where name=$1`, [name])
        const { rows } = await pool.query(`select * from users`)
        io.emit("allDetails", rows)

    })

})

 
app.use(express.json())

server.listen(8080, () => console.log("running on port:8080")
)


app.post("/postUser", async (req, res) => {
    try {
        debugger
        console.log("req in postusers", req.body);
        let check = await pool.query(`select userId from users where emailId=$1`, [req.body.mail])
        console.log("check rows", check.rows);

        if (check.rows.length == 0) {
            const { rows } = await pool.query(`insert into users (name, password, emailId, role) values ($1,$2,$3,$4) RETURNING *`, [req.body.name, req.body.password, req.body.mail, 1])
            res.status(200).send(rows)
            return
        }
        else {
            const { rows } = await pool.query(`update users set name=$1, password=$2 , role=$4 where emailId=$3 RETURNING *`, [req.body.name, req.body.password, req.body.mail,1])
            res.status(200).send(rows)
            return
        }


    } catch (e) {
        console.log("eror in postuser", e.message);

    }
})


app.get("/getUsers", async (req, res) => {
    debugger
    console.log("req in getUsers", req.body);



    const usersData = await pool.query(`select * from users`)
    console.log("data from Db", usersData.rows);

    res.status(200).send(usersData.rows)

})

app.post("/getGroups", async (req, res) => {

    console.log("req in getGroups", req.body);
    const { rows } = await pool.query(`select * from groups where groupId in (select groupId from groupsUsersMap where userId=$1)`, [req.body.userId])
    console.log("data from Db", rows);

    res.status(200).send(rows)
})

app.post("/createGroup", async (req, res) => {
    try {
        debugger
        console.log("req in createGroup", req.body);

        const { rows } = await pool.query(`insert into groups (name) values ($1) returning groupId`, [req.body.name])
        let createdGroupId = rows[0].groupid
        console.log("createdGroupId", createdGroupId);

        // createdGroupId=createdGroupId.groupId


        let insertingUser = []
        // console.log(`select userId, emailId from users where emailId in $1`, req.body.users);

        // Create a string of placeholders (like $1, $2, ...)
        const placeholders = req.body.users.map((_, index) => `$${index + 1}`).join(", ");

        let query = `SELECT userId, emailId FROM users WHERE emailId IN (${placeholders})`;

        // Execute the query with the users array as parameters
        let checkUsers = await pool.query(query, req.body.users);
        console.log("checkUsers--------9999", checkUsers.rows);

        let existUserId = checkUsers.rows.filter((val) => val)
        let allDbExistEmailId = checkUsers.rows.map((val) => val?.emailid).filter((val) => val)

        let nonExistUser = req.body.users.filter((val) => !allDbExistEmailId.includes(val))

        //////////////////////////////
        let insertUsers = []
        if (nonExistUser.length) {
            const values = nonExistUser.map((user, index) => `($${index + 1})`).join(", ");
            const params = nonExistUser


            const insertUsersQuery = `INSERT INTO users (emailId) VALUES ${values} RETURNING userId`;
            console.log(insertUsersQuery, "jhjhjhjjjjjj", params);

            // Execute the query with the parameters
            insertUsers = await pool.query(insertUsersQuery, params);
            insertUsers = insertUsers.rows
        }

        console.log(insertUsers, 'insertUsers');
        let total = [...insertUsers, ...existUserId]
        console.log("insertUsers -total---------", total);

        //insert in map table//

        if (total.length) {
            const insertQuery = total.map((val, index) => {
                return `(${createdGroupId},$${index + 1})`
            }).join()
            const insertvalues = total.map((val) => val.userid)

            console.log(`insert into groupsUsersMap (groupId,userId) values ${insertQuery}`);


            const insertMapTable = await pool.query(`insert into groupsUsersMap (groupId,userId) values ${insertQuery}`, insertvalues)

        }




        ////////////////////
        // const usersData = await pool.query(`select * from users`)
        // console.log("data from Db", usersData.rows);

        res.status(200).send('success')
    }
    catch (e) {
        console.log("errr", e.message);

    }

})
