require('dotenv').config()
require('express-async-errors')
const cors = require('cors');
const express = require('express')
const app = express()
const connectDb = require('./db')
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.json())

app.use('/api/v1', userRouter)

const port = 8080
const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI)
        console.log(`Database connected successfully...`);
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()