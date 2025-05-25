import express from 'express'
import { menData } from './data.js'

const app= express();


app.get('/',(req,res)=>{
console.log(req.url);

res.send("hello world");

});

app.get('/api/mendata',(req,res)=>{
    console.log(req.url);

    res.json(menData)
})

let port= process.env.PORT || 3200;

app.listen(port,()=>{
    console.log(`app is listineg on http://localhost:${port}`);
})