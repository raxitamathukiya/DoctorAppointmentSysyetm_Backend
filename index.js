const express=require('express')
const app=express()
const {doctorroute}=require('./router/doctor.route')
const {connection}=require("./db")
require('dotenv').config()
const cors=require('cors')
app.use(cors())
app.use(express.json())


    app.get('/',async(req,res)=>{
    try {
        res.status(200).send("welcome to masai hospital backend")
    } catch (error) {
        console.log(error)
    }
})
app.use("/",doctorroute)
app.listen(8080,()=>{
    console.log("server is running .....")
})