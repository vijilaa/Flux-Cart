const express=require("express")
const path=require("path")
const db =require("./Mongoose")
const cors = require("cors")
const app = express()
const parser = require('body-parser')
app.use(parser.json())
app.use(cors())
const port = 5000
const route= require('./Route')
app.use('/',route)

app.use('/upload', express.static(path.join(__dirname,'Images')))

app.listen(port,()=>{
    console.log(`console bye${port}`)
})
