const cors = require ("cors");
const express = require ("express")
const app = express()
const port = 3010;
const dbRouter = require ("../Routes/Routes.js")

app.use(cors())
app.use(express.json({ limit: '40mb' }))

app.get("/", (req, res)=>{
    res.send("I Arrived")
})

app.use("/api", dbRouter)

app.listen(port)