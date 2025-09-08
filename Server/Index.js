const express=require('express')
const app= express()
const port= 5000
const db = require('./Mongoose')
const route  = require('./Route')

app.use(route)
app.listen(port,()=>{
    console.log(`server is running${port}`)
})