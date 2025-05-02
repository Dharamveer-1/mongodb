const express=require('express')
const app=express()
const port=4000

const db=require('./config/db')
const seeder=require('./config/seeder')
seeder.admin()

app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.json())

const adminroutes=require('./route/apiRoute')
app.use('/api',adminroutes)


app.listen(port,(error)=>{
    if(error){
        console.log("server error",error);
        
    }else{
        console.log("server is running"+port);
        
    }
})