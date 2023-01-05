const express = require("express")
const dotenv = require('dotenv').config()
const connectDb=require("./config/db")
const app = express()
const errorMiddleware=require("./middleware/error")

app.use(express.json())


//handling Uncaught Exception

process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


//connect databas
connectDb()

//middleware

app.use('/api/v1', require('./routes/ProductRoute'))

//middleware for errors

app.use(errorMiddleware)









const server=app.listen(process.env.PORT,()=>console.log(`server is running on http:\\localhost:${process.env.PORT}`))

//unhandled promise Rejections

process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})