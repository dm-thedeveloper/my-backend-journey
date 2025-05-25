import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()

// APP confiugration

app.use(express.urlencoded({limit:"200kb", extended:true}))
app.use(express.json({limit:"200kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

// Route importing 
import userRoute from  "./route/user.route.js"



//Route Declaration  


app.use("/api",userRoute)

export {app}