import express from 'express';
import dotenv from 'dotenv';
import { employee } from './employee.js';
const app= express();
 
dotenv.config({path:'.env'});


app.get('/api/employee',(req,res)=>{
console.log(req.url);

res.json(employee) 
})


let PORT= process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`app is listeninig on http://localhost:${PORT}`);
})