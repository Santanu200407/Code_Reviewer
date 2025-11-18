const express =require("express")
const aiRoutes = require("./routes/ai.routes")
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use('/ai',aiRoutes)
module.exports=app