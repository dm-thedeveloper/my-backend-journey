import express from "express";
import  {api}  from "./api.js";

const app =express();

app.get('/api',(req,res)=>{
console.log(req.url);
res.send("helllo World !")
});

app.get('/api/jokes',(req,res)=>{
console.log(req.url);

res.send(api)

})


let port = process.env.PORT||3000 ;

app.listen(port,()=>{
console.log(`app is listening On http://localhost:${port}`);

})