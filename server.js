const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config();
const {dbConnect}=require("./db/dbConect")
dbConnect();

const port=process.env.PORT
const searchRouter=require("./routes/search")

app.use(express.json());

app.use("/",searchRouter)

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})