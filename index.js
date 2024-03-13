console.log("Hi")
const express = require('express')
const { default: mongoose } = require('mongoose')
const {Record} =require('./schema.js')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()
app.use(bodyparser.json())
app.use(cors())

async function connectToDb(){
    try{
        await mongoose.connect("mongodb+srv://jayavardhinim14:Jayvardh2004@cluster0.yxnqgbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB connection established")
        const port= process.env.PORT || 5000
        app.listen(port,function(){
        console.log(`listening to the port ${port}...`)
        })
    }catch(error){
        console.log(error)
        console.log("couldn't establish connection")
    }
}
connectToDb()





app.post('/add-Record',async function(request,response){
    try{
     await Record.create({
         "title" : request.body.title,
         "content": request.body.content,
         "date":request.body.date
     })
     response.status(201).json({
         "status":"success",
         "message":"new entry created"
     })
    }
    catch(error){
     console.log(error)
     response.status(201).json({
         "status":"failure",
         "message":"can't create new entry",
         "error":error
     })
    }
 })
 
 
 app.get('/get-Record',async function(request,response){
     try{const Records_data=await Record.find()
         console.log(Records_data)
         response.status(200).json(Records_data)
     }catch(error){
         console.log(error)
         response.status(500).json({
             "status":"failure",
             "message":"could not fetch entries",
             "error":error
         })
     }
 })
 

 app.delete('/delete-Record/:id',async function(request,response){
     try{
     const Record_delete= await Record.findById(request.params.id)/
     console.log(Record_delete)
     if(Record_delete){
         await Record.findByIdAndDelete(request.params.id)
         response.status(200).json({
             "status":"success",
             "message":"deleted entry"
         })
     }else{
         response.status(404).json({
             "status":"failure",
             "message":"could not find entry"
         })
     }
     }
     catch{
         console.log(error)
         response.status(500).json({
             "status":"failure",
             "message":"could not delete entry",
             "error":error
         })
     }
 
 })
 
 app.patch('/edit-Record/:id',async function(request,response){
     try{
     const edit_id=await Record.findById(request.params.id)
     if(edit_id){
         await edit_id.updateOne({
             "title": request.body.title,
             "content": request.body.content,
             "date" :request.body.date
         })
         response.status(200).json({
             "status":"success",
             "message":"Updated entry"
         })
     }else{
         response.status(404).json({
             "status":"failure",
             "message":"could not find entry"
         })
     }
     }
     catch(error){
         console.log(error)
         response.status(500).json({
             "status":"failure",
             "message":"could not update entry",
             "error":error
         })
     }
 })