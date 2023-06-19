import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from "url";
import {mongoose} from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import classRoute from './routes/classRoute.js'
import attendeesRoute from './routes/attendeesRoute.js'
import eventsRoute from './routes/eventRoute.js'
import authRoute from './routes/authRoute.js'
import picsRoute from './routes/picRoute.js'

//ENVIROMENT VARIABLES
dotenv.config()
const port = process.env.PORT
//INIT EXPRESS APP
const app = express()
//MONGODB SETUP
mongoose.set("strictQuery" , true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        throw(error);
    }
}
// DIRNAME & SERVE STATIC IMG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploads = path.join(__dirname,'/assets/uploads')
app.use(express.static(path.join(__dirname, './assets')))
// APP 
app.use(express.json())
app.use(cors({origin:"http://localhost:3000" , credentials: true}))
app.use(cookieParser())
// ENDPOINTS
app.use('/api/auth', authRoute)
app.use('/api/class', classRoute)
app.use('/api/attendees', attendeesRoute)
app.use('/api/events', eventsRoute)
app.use('/api/pics', picsRoute)


app.listen(port , ()=> {
    connect();
    console.log(`http://localhost:${port}`)
})