// express is a minimal nodejs framework , a higher level of abstracton
// it allows rapid developnent of Node.js  application
// contains a very robust set of features : complex routing esier handling of request and responses, middleware server side rending 

// installing postman
// postman is used to test api or use to run api GET,POST ,PATCH request 
// in express we define Route( this determine how an application respond to a certain request or a client request )

const express = require("express")
const app = express()

app.get("/", (req, res)=> {
    res.status(200).json({message:"hello from the server side ", app:"Natour"})
})
app.post("/", (req, res)=> {
    res.status(200).json({message: "this is a post request"})
})
// app.get()
const port = 3000
app.listen(port,()=>{
    console.log(`app running on port ${port}... `)
})