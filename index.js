import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRouter from './router/student.router.mjs';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url'

let app = express()
dotenv.config();
let PORT= process.env.PORT || 6020
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) 

var corsOptions = { 
    origin: 'https://brilliant-travesseiro-ee174f.netlify.app',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, PATCH,  POST, DELETE"
}

app.use(cors(corsOptions));

app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
}) 

mongoose.connect(process.env.MONGO_URL)

.then(()=>{
    console.log('DB sucessfully connected');
})
.catch((err)=>{
 console.log('Error',err);
})

app.use('/student',studentRouter)

